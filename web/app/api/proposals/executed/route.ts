import { NextRequest, NextResponse } from 'next/server';
import { decodeEventLog, parseAbiItem } from 'viem';
import { moonbaseAlpha } from 'viem/chains';
import { getChainById } from '@/store/supportedChains';
import { getRpcProviderForChain } from '@/utils/provider';

import GovernorBravoABI from '../../../home/_contracts/GovernorBravoABI';
import VaultABI from '@/contracts/abis/Vault';

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

    // moonbase
    const vaultContract = '0x60d9DCe12fAbCB6fEf7982Ec39b8f2Ae6B61B8b8';

    if (!vaultContract) {
      return NextResponse.json({ error: 'vaultContract is required' }, { status: 400 });
    }

    const provider = getRpcProviderForChain(moonbaseAlpha);

    const event = parseAbiItem('event GovernableProposalExecuted(uint256 proposalId)');
    const logs = await provider.getLogs({
      address: vaultContract,
      event,
      fromBlock: BigInt(6181124), // deployed to moonbase
      toBlock: 'latest',
    });

    console.log({ logs });
    const hashes = [];

    if (logs.length > 0) {
      for (const log of logs) {
        hashes.push({ tx: log.transactionHash, proposalId: log.args.proposalId?.toString() });
      }
    }

    console.log({ hashes });

    return NextResponse.json({ hashes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
