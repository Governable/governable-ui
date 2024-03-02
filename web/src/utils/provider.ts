import { createPublicClient, http } from 'viem';
import { Chain } from 'viem/chains';
import { SEPOLIA_RPC_URL } from '@/constants';

export function getRpcProviderForChain(chain: Chain, rpc?: string) {
  const rpcUrl = chain.rpcUrls.default.http[0];
  console.log({ rpcUrl });
  return createPublicClient({
    chain: chain,
    transport: http(rpc ? rpc : SEPOLIA_RPC_URL),
  });
}
