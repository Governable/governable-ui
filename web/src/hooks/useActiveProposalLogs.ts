import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { CONTRACTS_BY_CHAIN_ID } from '@/constants';

// TODO: move this to generic types
type ActiveProposal = {
  id: string;
  title: string;
  description: string;
  proposer: string;
};

type ProposalResponse = {
  logs: ActiveProposal[];
};

const useActiveProposals = (refreshIntervalMs = 30_000) => {
  const [activeProposals, setActiveProposals] = useState<ActiveProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { chain } = useAccount();
  const chainId: number = chain?.id ?? 1;

  // TODO: move to config, this is hardcoded to governer bravo L1
  const governance = CONTRACTS_BY_CHAIN_ID[chainId].governance;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchActiveProposals = async () => {
      if (!chainId) {
        setActiveProposals([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/proposals/active?chainId=${chainId}&governance=${governance}`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = (await response.json()) as ProposalResponse;
        setActiveProposals(data.logs);
      } catch (err) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    // Refresh current block number every 15 seconds.
    const fetchActiveProposalsWrapper = () => {
      fetchActiveProposals().catch(console.error); // Handle promise rejection
    };
    // TODO: Implement a shared state or other mechanism to prevent overloading the backend with multiple intervals.
    intervalId = setInterval(fetchActiveProposalsWrapper, refreshIntervalMs);
    void fetchActiveProposals();

    return () => {
      clearInterval(intervalId); // Clear interval on cleanup
    };
  }, [chainId, refreshIntervalMs]);

  return { isLoading, activeProposals };
};

export default useActiveProposals;
