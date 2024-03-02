import { useCallback, useEffect, useState } from 'react';
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import Button from '@/components/Button/Button';
import { EXPECTED_CHAIN } from '@/constants';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { useGovernableContract } from '../_contracts/useGovernable';

export enum Vote {
  NO = 0,
  YES = 1,
  ABSTAIN = 2,
}

export default function Proposal({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const { chain: accountChain } = useAccount();

  const [userVote, setUserVote] = useState<Vote | undefined>(Vote.NO);
  const [brevisId, setBrevisId] = useState<string>('');

  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  console.log({ chain });
  const governanceContract = useGovernableContract();

  const { data: stateData } = useReadContract({
    address: governanceContract.status === 'ready' ? governanceContract.address : undefined,
    abi: governanceContract.abi,
    functionName: 'state',
    args: [BigInt(id)],
  });

  console.log({ stateData });

  const { data: voteData } = useSimulateContract({
    address: governanceContract.status === 'ready' ? governanceContract.address : undefined,
    abi: governanceContract.abi,
    functionName: 'castVote',
    args: [
      BigInt(id),
      userVote ?? 0,
      '0x55dff55ead93dadb2aa2f606a64e7dcf8ef45c34a2a7b082374368a751a583a4',
    ],
  });

  console.log({ voteData });

  const { writeContract: castVote, error: errorCast, data: dataVote } = useWriteContract();

  console.log({ dataVote });
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataVote,
    query: {
      enabled: !!dataVote,
    },
  });

  useEffect(() => {
    if (transactionStatus === 'success') {
      console.log('tx success');
    }

    if (errorCast) {
      console.log({ errorCast });
    }
  }, [transactionStatus, errorCast]);

  const handleVote = useCallback(() => {
    console.log('votingqqq: ', userVote);

    console.log({ voteData });
    if (voteData?.request) {
      castVote?.(voteData?.request);
    }
  }, [userVote, voteData, castVote]);

  if (stateData === 7 || stateData === 4) {
    return (
      <div className="container mx-auto flex flex-col gap-1 rounded-lg border-2 p-3">
        <div>{stateData === 7 ? 'Executed' : 'Succeeded'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-1 rounded-lg border-2 p-3">
      <div>ID: {id}</div>
      <div>{title}</div>
      <div className="text-xs">{description.slice(0, 512)}...</div>
      <div>
        <input
          type="text"
          className="w-full rounded-md border-2 p-2 text-xs"
          onChange={(e) => {
            setBrevisId(e.target.value.trim() as `0x{string}`);
          }}
          value={brevisId}
        />
      </div>
      <div className="container mx-auto flex flex-row justify-around p-6">
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            id="vote-yes"
            name="vote"
            value="yes"
            onChange={() => {
              console.log('yes');
              setUserVote(Vote.YES);
            }}
          />
          <label htmlFor="vote-yes">Yes</label>
        </div>
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            id="vote-no"
            name="vote"
            value="no"
            onChange={() => {
              console.log('no');
              setUserVote(Vote.NO);
            }}
          />
          <label htmlFor="vote-no">No</label>
        </div>
        <div className="flex flex-row gap-1">
          <input
            type="radio"
            id="vote-abstain"
            name="vote"
            value="abstain"
            onChange={() => {
              console.log('abstain');
              setUserVote(Vote.ABSTAIN);
            }}
          />
          <label htmlFor="vote-abstain">Abstain</label>
        </div>
      </div>

      <div className="space-between container mx-auto flex flex-row gap-8 rounded-sm p-6">
        <Button
          disabled={!userVote || !brevisId || !id}
          variant="primary"
          onClick={handleVote}
          buttonContent="Cast Vote"
        />
      </div>
    </div>
  );
}
