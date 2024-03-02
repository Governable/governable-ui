import dynamic from 'next/dynamic';
import ClipLoader from 'react-spinners/ClipLoader';
import useActiveProposals from '@/hooks/useActiveProposalLogs';

const Proposal = dynamic(async () => import('./Proposal').then((mod) => mod), {
  ssr: false,
});

export default function ActiveProposals() {
  const { isLoading, activeProposals } = useActiveProposals();

  return (
    <div
      className="container mx-auto flex w-full flex-col items-center gap-3 p-6"
      style={{ borderRight: '2px solid white' }}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="font-bold uppercase">Active Proposals</div>
        <ClipLoader
          color="white"
          loading={isLoading}
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div>{`{ Shows Proposals created on L2 } `}</div>
      <div className="container flex flex-col gap-3">
        {activeProposals.map((proposal) => (
          <Proposal key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
}
