// Blockchain integration exports
export { blockchainService, BlockchainService } from './service';
export { BLOCKCHAIN_CONFIG, ORDER_STORAGE_ABI, OrderStatus, ORDER_STATUS_LABELS } from './config';
export type { 
  BlockchainOrder, 
  CreateOrderParams, 
  TransactionResult, 
  WalletState,
  BlockchainServiceConfig 
} from './types';
