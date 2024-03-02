import { NextRequest, NextResponse } from 'next/server';
import { decodeEventLog, parseAbiItem } from 'viem';
import { getChainById } from '@/store/supportedChains';
import { getRpcProviderForChain } from '@/utils/provider';

import GovernorBravoABI from '../../../home/_contracts/GovernorBravoABI';

/**
 * Handler for the /api/proposal/active route, this route will return the active proposals
 * @param req
 * @param res
 */
export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Get the Chain Id from the request
    const chainId = req.nextUrl.searchParams.get('chainId');
    if (!chainId) {
      return NextResponse.json({ error: 'chainid is required' }, { status: 400 });
    }
    const chain = getChainById(chainId);
    if (!chain) {
      return NextResponse.json({ error: 'chain not supported' }, { status: 400 });
    }

    const governanceContract = req.nextUrl.searchParams.get('governance') as `0x${string}`;
    if (!governanceContract) {
      return NextResponse.json({ error: 'governance is required' }, { status: 400 });
    }

    const provider = getRpcProviderForChain(chain);

    const event = parseAbiItem(
      'event ProposalCreated(uint id, address proposer, address[] targets, uint[] values, string[] signatures, bytes[] calldatas, uint startBlock, uint endBlock, string description)',
    );
    const logs = await provider.getLogs({
      address: governanceContract,
      event,
      fromBlock: BigInt(5399017), // deployment block
      toBlock: 'latest',
    });

    const decodedLogs = [];

    if (logs.length > 0) {
      for (const log of logs) {
        const decoded = decodeEventLog({
          abi: GovernorBravoABI,
          data: log.data,
          topics: log.topics,
        });
        console.log({ decoded });
        const { id, proposer, description } = decoded.args;
        decodedLogs.push({
          id: id.toString(),
          proposer,
          description,
        });
      }
    }

    return NextResponse.json({ logs: decodedLogs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
