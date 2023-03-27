import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  Proposal
} from 'constants/proposals'
import { fetchProposalData } from 'utils/api/aragon'
import { Token } from 'constants/tokens'

export interface TokenMarketDataValues {
  yes?: number[][]
  no?: number[][]
  available?: number[][]
  time?: number[][]
}

export interface ProposalsContext {
  getProposalDataBySymbol: (proposal: Proposal) => Proposal[]
  selectProposalsDataByToken: (proposal: Token) => number[][]
}

export type ProposalContextKeys = keyof ProposalsContext

export const ProposalsDataContext = createContext<ProposalsContext>({
  getProposalDataBySymbol: () => [],
  selectProposalsDataByToken: () => [[]],
})

export const useProposalsData = () => useContext(ProposalsDataContext)

export const MarketDataProvider = (props: { children: any }) => {
  const [proposalsData, setProposalsData] = useState<any>({})

  const selectProposalsDataByToken= (token: Token): number[][]=> {
    //filter data by token and return that array
    return [[0]]
  }

  const getProposalDataBySymbol = () => {
    return proposalsData
  }


  const fetchLiveProposalsData = useCallback(async () => {
    const proposalsData = await Promise.all([
      fetchProposalData(),
    ])

    setProposalsData(proposalsData)
  }, [])

  useEffect(() => {
    fetchLiveProposalsData()
  }, [fetchLiveProposalsData])

  return (
    <ProposalsDataContext.Provider
      value={{
        getProposalDataBySymbol,
        selectProposalsDataByToken
      }}
    >
      {props.children}
    </ProposalsDataContext.Provider>
  )
}
