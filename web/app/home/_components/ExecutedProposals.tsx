import useExecutedProposalLogs from '@/hooks/useExecutedProposalLogs';

export default function ExecutedProposals() {
  const hashes = useExecutedProposalLogs();

  const { executedProposals } = hashes || [];

  console.log({ executedProposals });
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 12)}...${address.slice(-12)}`;
  };

  return (
    <div className="container mx-auto flex flex-col items-center gap-3 p-6">
      <div className="font-bold uppercase">Executed Proposals</div>
      <div>{`{ Shows proposal execution transactions on L1 } `}</div>
      <div>
        {executedProposals.map(({ tx, proposalId }) => (
          <div key={tx}>
            <a href={`https://moonbase.moonscan.io/tx/${tx}`} target="_blank">
              {proposalId} : {shortenAddress(tx)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
