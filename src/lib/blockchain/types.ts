import { OrderStatus } from './config';

export interface BlockchainOrder {
  id: bigint;
  buyer: string;
  productHash: string;
  quantity: bigint;
  totalPrice: bigint;
  status: OrderStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateOrderParams {
  productHash: string;
  quantity: number;
  totalPrice: string; // In wei
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  orderId?: bigint;
  error?: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

export interface BlockchainServiceConfig {
  contractAddress: string;
  networkKey?: 'sepolia' | 'mainnet' | 'polygon';
  customRpcUrl?: string;
}
