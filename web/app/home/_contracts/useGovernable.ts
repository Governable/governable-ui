import { baseSepolia, mainnet, sepolia } from 'viem/chains';
import { CONTRACTS_BY_CHAIN_ID } from '@/constants';
import { generateContractHook } from '@/hooks/contracts';
import GovernableABI from './Governable';

/**
 * Returns contract data for the Custom1155 contract.
 */
export const useGovernableContract = generateContractHook({
  abi: GovernableABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
  },
  [sepolia.id]: {
    chain: sepolia,
    address: '0x161303e2D74081dF0D918680a7B5bc96090C4802',
  },
  [mainnet.id]: {
    chain: mainnet,
    address: CONTRACTS_BY_CHAIN_ID[mainnet.id].governance as `0x{string}`,
  },
  // more chains for this contract go here
});
