import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import { CONTRACTS_BY_CHAIN_ID } from '@/constants';

// TODO: move this to generic types

type ExecutedProposalResponse = {
  hashes: string[];
};

const useExecutedProposalLogs = (refreshIntervalMs = 30_000) => {
  const [executedProposals, setExecutedProposals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { chain } = useAccount();
  const chainId: number = chain?.id ?? 1;

  // TODO: move to config, this is hardcoded to governer bravo L1
  const vault = CONTRACTS_BY_CHAIN_ID[chainId].vault;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchExecutedProposals = async () => {
      if (!chainId) {
        setExecutedProposals([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/proposals/executed?chainId=${chainId}&vault=${vault}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const { hashes } = (await response.json()) as ExecutedProposalResponse;
        console.log({ hashes });
        setExecutedProposals(hashes);
      } catch (err) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    // Refresh current block number every 15 seconds.
    const fetchExecutedProposalsWrapper = () => {
      fetchExecutedProposals().catch(console.error); // Handle promise rejection
    };
    // TODO: Implement a shared state or other mechanism to prevent overloading the backend with multiple intervals.
    intervalId = setInterval(fetchExecutedProposalsWrapper, refreshIntervalMs);
    void fetchExecutedProposals();

    return () => {
      clearInterval(intervalId); // Clear interval on cleanup
    };
  }, [chainId, refreshIntervalMs]);

  return { isLoading, executedProposals };
};

export default useExecutedProposalLogs;
