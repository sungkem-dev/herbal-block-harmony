import { useState, useEffect, useCallback } from 'react';
import { 
  blockchainService, 
  type WalletState, 
  type BlockchainOrder, 
  type CreateOrderParams,
  type TransactionResult,
  type BlockchainServiceConfig,
  OrderStatus
} from '@/lib/blockchain';

// Helper to get ethereum provider from window
interface EthereumProvider {
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
}

const getEthereumProvider = (): EthereumProvider | undefined => {
  if (typeof window !== 'undefined' && 'ethereum' in window) {
    return (window as { ethereum?: EthereumProvider }).ethereum;
  }
  return undefined;
};

interface UseBlockchainReturn {
  // Wallet state
  wallet: WalletState;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initialize: (config: BlockchainServiceConfig) => Promise<boolean>;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  
  // Order operations
  createOrder: (params: CreateOrderParams) => Promise<TransactionResult>;
  getOrder: (orderId: bigint) => Promise<BlockchainOrder | null>;
  getMyOrders: () => Promise<BlockchainOrder[]>;
  updateOrderStatus: (orderId: bigint, status: OrderStatus) => Promise<TransactionResult>;
  completeOrder: (orderId: bigint) => Promise<TransactionResult>;
  cancelOrder: (orderId: bigint) => Promise<TransactionResult>;
  
  // Utilities
  formatPrice: (weiAmount: bigint) => string;
  parsePrice: (etherAmount: string) => bigint;
}

export function useBlockchain(): UseBlockchainReturn {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for account and chain changes
  useEffect(() => {
    const ethereum = getEthereumProvider();
    if (!ethereum) return;

    const handleAccountsChanged = async (accounts: unknown) => {
      const accountsArray = accounts as string[];
      if (accountsArray.length === 0) {
        setWallet({
          isConnected: false,
          address: null,
          chainId: null,
          balance: null,
        });
      } else {
        const state = await blockchainService.getWalletState();
        setWallet(state);
      }
    };

    const handleChainChanged = async () => {
      const state = await blockchainService.getWalletState();
      setWallet(state);
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const initialize = useCallback(async (config: BlockchainServiceConfig): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await blockchainService.initialize(config);
      setIsInitialized(success);
      
      if (!success) {
        setError('Failed to initialize blockchain service');
      }
      
      return success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const state = await blockchainService.connectWallet();
      setWallet(state);
      
      if (!state.isConnected) {
        setError('Failed to connect wallet');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    const state = blockchainService.disconnectWallet();
    setWallet(state);
  }, []);

  const createOrder = useCallback(async (params: CreateOrderParams): Promise<TransactionResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await blockchainService.createOrder(params);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrder = useCallback(async (orderId: bigint): Promise<BlockchainOrder | null> => {
    return blockchainService.getOrder(orderId);
  }, []);

  const getMyOrders = useCallback(async (): Promise<BlockchainOrder[]> => {
    setIsLoading(true);
    try {
      return await blockchainService.getMyOrders();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: bigint, status: OrderStatus): Promise<TransactionResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await blockchainService.updateOrderStatus(orderId, status);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeOrder = useCallback(async (orderId: bigint): Promise<TransactionResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await blockchainService.completeOrder(orderId);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderId: bigint): Promise<TransactionResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await blockchainService.cancelOrder(orderId);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formatPrice = useCallback((weiAmount: bigint): string => {
    return blockchainService.formatPrice(weiAmount);
  }, []);

  const parsePrice = useCallback((etherAmount: string): bigint => {
    return blockchainService.parsePrice(etherAmount);
  }, []);

  return {
    wallet,
    isInitialized,
    isLoading,
    error,
    initialize,
    connectWallet,
    disconnectWallet,
    createOrder,
    getOrder,
    getMyOrders,
    updateOrderStatus,
    completeOrder,
    cancelOrder,
    formatPrice,
    parsePrice,
  };
}
