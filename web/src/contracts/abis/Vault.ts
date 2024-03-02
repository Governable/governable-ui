const abi = [
  [
    {
      inputs: [
        { internalType: 'address', name: '_wormholeRelayer', type: 'address' },
        { internalType: 'uint16', name: '_governanceSourceChain', type: 'uint16' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    { inputs: [], name: 'InvalidGovernance', type: 'error' },
    { inputs: [], name: 'InvalidRelayer', type: 'error' },
    { inputs: [], name: 'InvalidSourceChain', type: 'error' },
    { inputs: [], name: 'OnlyOwner', type: 'error' },
    { inputs: [], name: 'UnauthorizedRelayer', type: 'error' },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'GovernableProposalExecuted',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'bytes', name: 'payload', type: 'bytes' },
        { internalType: 'bytes[]', name: '', type: 'bytes[]' },
        { internalType: 'bytes32', name: 'sourceAddress', type: 'bytes32' },
        { internalType: 'uint16', name: 'sourceChain', type: 'uint16' },
        { internalType: 'bytes32', name: '', type: 'bytes32' },
      ],
      name: 'receiveWormholeMessages',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_governance', type: 'address' }],
      name: 'setGovernance',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'wormholeRelayer',
      outputs: [{ internalType: 'contract IWormholeRelayer', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ],
] as const;

export default abi;
