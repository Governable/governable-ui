import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import { getChainsForEnvironment } from './supportedChains';

export function createWagmiConfig(projectId: string) {
  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended Wallet',
        wallets: [coinbaseWallet],
      },
      {
        groupName: 'Other Wallets',
        wallets: [rainbowWallet, metaMaskWallet],
      },
    ],
    {
      appName: 'buildonchainapps',
      projectId,
    },
  );

  return createConfig({
    ssr: true,
    chains: getChainsForEnvironment(),
    transports: {
      [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/yh2nmCNbhu5i9tVihqa2B4mH_BENwg80'),
      [baseSepolia.id]: http(),
      [base.id]: http(),
      [mainnet.id]: http('https://eth-mainnet.blastapi.io/e79ca2c1-0de1-4e4d-a2b6-6294de133d2e'),
    },
    connectors,
  });
}
