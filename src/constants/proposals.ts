import { ProposalContextKeys } from 'providers/VotingData'

import { MAINNET } from './chains'
import { Token } from './tokens'

export const dpiProposalImage =
  'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'

export enum ProposalStatus {
  passed = 'passed',
  rejected = 'rejected',
  open = 'open',
}

export interface Proposal {
  name: string
  symbol: string
  id: string | undefined
  contractAddress: string | undefined
  index: Token,
  // Url path for the proposal
  url: string
  image: string
  proposalContextKey?: ProposalContextKeys
  isDangerous: boolean
  status: ProposalStatus
  defaultChain?: number
  yes?: string
  no?:string
}
