// Blockchain configuration
export const BLOCKCHAIN_CONFIG = {
  // Default to Ethereum Sepolia testnet - can be changed to mainnet or other networks
  networks: {
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia Testnet',
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY',
      explorerUrl: 'https://sepolia.etherscan.io',
    },
    mainnet: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      explorerUrl: 'https://etherscan.io',
    },
    polygon: {
      chainId: 137,
      name: 'Polygon Mainnet',
      rpcUrl: 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
    },
  },
  defaultNetwork: 'sepolia' as const,
};

// Order Storage Contract ABI - adjust based on your deployed contract
export const ORDER_STORAGE_ABI = [
  // Events
  "event OrderCreated(uint256 indexed orderId, address indexed buyer, string productHash, uint256 timestamp)",
  "event OrderUpdated(uint256 indexed orderId, uint8 status, uint256 timestamp)",
  "event OrderCompleted(uint256 indexed orderId, uint256 timestamp)",
  
  // Read functions
  "function getOrder(uint256 orderId) view returns (tuple(uint256 id, address buyer, string productHash, uint256 quantity, uint256 totalPrice, uint8 status, uint256 createdAt, uint256 updatedAt))",
  "function getOrdersByBuyer(address buyer) view returns (uint256[])",
  "function getOrderCount() view returns (uint256)",
  "function orderExists(uint256 orderId) view returns (bool)",
  
  // Write functions
  "function createOrder(string productHash, uint256 quantity, uint256 totalPrice) returns (uint256)",
  "function updateOrderStatus(uint256 orderId, uint8 status)",
  "function completeOrder(uint256 orderId)",
  "function cancelOrder(uint256 orderId)",
] as const;

// Order status enum matching the smart contract
export enum OrderStatus {
  Pending = 0,
  Confirmed = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Completed = 5,
  Cancelled = 6,
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'Pending',
  [OrderStatus.Confirmed]: 'Confirmed',
  [OrderStatus.Processing]: 'Processing',
  [OrderStatus.Shipped]: 'Shipped',
  [OrderStatus.Delivered]: 'Delivered',
  [OrderStatus.Completed]: 'Completed',
  [OrderStatus.Cancelled]: 'Cancelled',
};
