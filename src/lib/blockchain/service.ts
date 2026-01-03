import { ethers, BrowserProvider, Contract, JsonRpcProvider, formatEther, parseEther, Eip1193Provider } from 'ethers';
import { BLOCKCHAIN_CONFIG, ORDER_STORAGE_ABI, OrderStatus } from './config';
import type { BlockchainOrder, CreateOrderParams, TransactionResult, WalletState, BlockchainServiceConfig } from './types';

// Helper to get ethereum provider from window
const getEthereumProvider = (): Eip1193Provider | undefined => {
  if (typeof window !== 'undefined' && 'ethereum' in window) {
    return (window as { ethereum?: Eip1193Provider }).ethereum;
  }
  return undefined;
};

class BlockchainService {
  private provider: BrowserProvider | JsonRpcProvider | null = null;
  private contract: Contract | null = null;
  private signer: ethers.Signer | null = null;
  private config: BlockchainServiceConfig | null = null;

  /**
   * Initialize the blockchain service with contract configuration
   */
  async initialize(config: BlockchainServiceConfig): Promise<boolean> {
    try {
      this.config = config;
      const networkConfig = BLOCKCHAIN_CONFIG.networks[config.networkKey || BLOCKCHAIN_CONFIG.defaultNetwork];
      
      // Check if MetaMask or other wallet is available
      const ethereum = getEthereumProvider();
      if (ethereum) {
        this.provider = new BrowserProvider(ethereum);
      } else {
        // Fallback to read-only provider
        const rpcUrl = config.customRpcUrl || networkConfig.rpcUrl;
        this.provider = new JsonRpcProvider(rpcUrl);
      }

      // Create read-only contract instance
      this.contract = new Contract(config.contractAddress, ORDER_STORAGE_ABI, this.provider);
      
      console.log('Blockchain service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      return false;
    }
  }

  /**
   * Connect user's wallet (MetaMask, etc.)
   */
  async connectWallet(): Promise<WalletState> {
    try {
      const ethereum = getEthereumProvider();
      if (!ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.');
      }

      this.provider = new BrowserProvider(ethereum);
      
      // Request account access
      const accounts = await this.provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock your wallet.');
      }

      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);

      // Recreate contract with signer for write operations
      if (this.config) {
        this.contract = new Contract(this.config.contractAddress, ORDER_STORAGE_ABI, this.signer);
      }

      return {
        isConnected: true,
        address,
        chainId: Number(network.chainId),
        balance: formatEther(balance),
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return {
        isConnected: false,
        address: null,
        chainId: null,
        balance: null,
      };
    }
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet(): WalletState {
    this.signer = null;
    if (this.config && this.provider) {
      this.contract = new Contract(this.config.contractAddress, ORDER_STORAGE_ABI, this.provider);
    }
    return {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    };
  }

  /**
   * Get current wallet state
   */
  async getWalletState(): Promise<WalletState> {
    try {
      if (!this.signer || !this.provider) {
        return { isConnected: false, address: null, chainId: null, balance: null };
      }

      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);

      return {
        isConnected: true,
        address,
        chainId: Number(network.chainId),
        balance: formatEther(balance),
      };
    } catch {
      return { isConnected: false, address: null, chainId: null, balance: null };
    }
  }

  /**
   * Create a new order on the blockchain
   */
  async createOrder(params: CreateOrderParams): Promise<TransactionResult> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected. Please connect your wallet first.');
      }

      const tx = await this.contract.createOrder(
        params.productHash,
        params.quantity,
        parseEther(params.totalPrice)
      );

      const receipt = await tx.wait();
      
      // Parse the OrderCreated event to get the order ID
      const orderCreatedEvent = receipt.logs.find(
        (log: ethers.Log) => {
          try {
            const parsed = this.contract!.interface.parseLog({
              topics: [...log.topics],
              data: log.data,
            });
            return parsed?.name === 'OrderCreated';
          } catch {
            return false;
          }
        }
      );

      let orderId: bigint | undefined;
      if (orderCreatedEvent) {
        const parsed = this.contract.interface.parseLog({
          topics: [...orderCreatedEvent.topics],
          data: orderCreatedEvent.data,
        });
        orderId = parsed?.args?.orderId;
      }

      return {
        success: true,
        transactionHash: receipt.hash,
        orderId,
      };
    } catch (error) {
      console.error('Failed to create order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get order by ID
   */
  async getOrder(orderId: bigint): Promise<BlockchainOrder | null> {
    try {
      if (!this.contract) {
        throw new Error('Service not initialized');
      }

      const order = await this.contract.getOrder(orderId);
      
      return {
        id: order.id,
        buyer: order.buyer,
        productHash: order.productHash,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: Number(order.status) as OrderStatus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    } catch (error) {
      console.error('Failed to get order:', error);
      return null;
    }
  }

  /**
   * Get all orders for the connected wallet
   */
  async getMyOrders(): Promise<BlockchainOrder[]> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const address = await this.signer.getAddress();
      const orderIds: bigint[] = await this.contract.getOrdersByBuyer(address);
      
      const orders = await Promise.all(
        orderIds.map((id) => this.getOrder(id))
      );

      return orders.filter((order): order is BlockchainOrder => order !== null);
    } catch (error) {
      console.error('Failed to get orders:', error);
      return [];
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<TransactionResult> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await this.contract.updateOrderStatus(orderId, status);
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
      };
    } catch (error) {
      console.error('Failed to update order status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Complete an order
   */
  async completeOrder(orderId: bigint): Promise<TransactionResult> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await this.contract.completeOrder(orderId);
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
      };
    } catch (error) {
      console.error('Failed to complete order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: bigint): Promise<TransactionResult> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await this.contract.cancelOrder(orderId);
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
      };
    } catch (error) {
      console.error('Failed to cancel order:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get total order count
   */
  async getOrderCount(): Promise<bigint> {
    try {
      if (!this.contract) {
        throw new Error('Service not initialized');
      }

      return await this.contract.getOrderCount();
    } catch (error) {
      console.error('Failed to get order count:', error);
      return BigInt(0);
    }
  }

  /**
   * Check if an order exists
   */
  async orderExists(orderId: bigint): Promise<boolean> {
    try {
      if (!this.contract) {
        throw new Error('Service not initialized');
      }

      return await this.contract.orderExists(orderId);
    } catch {
      return false;
    }
  }

  /**
   * Listen for order events
   */
  onOrderCreated(callback: (orderId: bigint, buyer: string, productHash: string, timestamp: bigint) => void): void {
    if (!this.contract) return;
    
    this.contract.on('OrderCreated', (orderId, buyer, productHash, timestamp) => {
      callback(orderId, buyer, productHash, timestamp);
    });
  }

  onOrderUpdated(callback: (orderId: bigint, status: OrderStatus, timestamp: bigint) => void): void {
    if (!this.contract) return;
    
    this.contract.on('OrderUpdated', (orderId, status, timestamp) => {
      callback(orderId, Number(status) as OrderStatus, timestamp);
    });
  }

  /**
   * Remove all event listeners
   */
  removeAllListeners(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
  }

  /**
   * Format wei to ether for display
   */
  formatPrice(weiAmount: bigint): string {
    return formatEther(weiAmount);
  }

  /**
   * Parse ether string to wei
   */
  parsePrice(etherAmount: string): bigint {
    return parseEther(etherAmount);
  }
}

// Singleton instance
export const blockchainService = new BlockchainService();

// Also export the class for testing or multiple instances
export { BlockchainService };
