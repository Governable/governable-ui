import dotenv from 'dotenv';
import { baseSepolia } from 'viem/chains';

dotenv.config();

type ContractDetails = {
  governance: string;
  vault: string;
};

type ContractsByChainId = Record<number, ContractDetails>;

export const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL ?? 'https://eth.llamarpc.com';
export const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL ?? 'https://eth.llamarpc.com';

export const CONTRACTS_BY_CHAIN_ID: ContractsByChainId = {
  1: {
    governance: '0xc0Da02939E1441F497fd74F78cE7Decb17B66529',
    vault: '0xc0Da02939E1441F497fd74F78cE7Decb17B66529',
  },
  11155111: {
    governance: '0x161303e2D74081dF0D918680a7B5bc96090C4802',
    vault: '0x161303e2D74081dF0D918680a7B5bc96090C4802',
  },
  5: {
    governance: '0xc0Da02939E1441F497fd74F78cE7Decb17B66529',
    vault: '0xc0Da02939E1441F497fd74F78cE7Decb17B66529',
  },
};
export const EXPECTED_CHAIN = baseSepolia;
