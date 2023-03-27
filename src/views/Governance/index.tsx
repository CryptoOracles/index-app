import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import Page from 'components/page/Page'
import PageTitle from 'components/page/PageTitle'
import { ProposalStatus, Proposal } from 'constants/proposals'
import { ProposalContextKeys, useProposalsData } from 'providers/VotingData'

import { ProposalFilter as ProposalFilter, ProposalsFilter } from './components/ProposalsFilter'
import ProposalTable from './components/ProposalsTable'

/*  Disabling for 1Y time period because it saves
  us a lot of Coingecko API calls.
  To enable, add Max History call in coingeckoApi.ts
*/
export interface ProposalsTable extends Proposal {
  options: {
    'Yes': number
    'No': number
    'Time': number
    'state': ProposalState
  }
}

export const ProposalOptionsValues: 
  (keyof ProposalsTable['options'])[] = ['Yes', 'No', 'Time', 'state'];

type PriceChangesProps = {
  daysOfComparison: number
  hourlyPrices?: number[][]
  prices?: number[][]
}

const appendProposalStats = ({
  proposal
}: {
  proposal: Proposal
}): ProposalsTable => {
  //TODO:get proposal infos
}

const Proposals = () => {
  const proposalsData = useProposalsData()

  const getProposalsData = (proposalContextKey?: ProposalContextKeys) => {
    if (
      proposalContextKey &&
      proposalContextKey !== 'getProposalDataBySymbol' &&
      proposalContextKey !== 'selectProposalsDataByToken'
    ) {
      return {
        proposalData: proposalsData[proposalContextKey]?
      }
    }
  }

  const proposalsFiltered = (filter: ProposalFilter): ProposalsTable[] => {
    switch (filter) {
      case ProposalFilter.all:
        return proposalsWithMarketData()

      case ProposalFilter.leverage:
        return proposalsWithMarketData(
          proposalsData.filter((proposal) =>
            proposal.proposalTypes.includes(ProposalStatus.open)
          )
        )
      case ProposalFilter.thematic:
        return proposalsWithMarketData(
          proposalsData.filter((proposal) =>
            proposal.proposalTypes.includes(ProposalStatus.passed)
          )
        )
      case ProposalFilter.yield:
        return proposalsWithMarketData(
          proposalsData.filter((proposal) => proposal.proposalTypes.includes(ProposalStatus.rejected))
        )
    }
  }

  const proposalsWithMarketData = (proposals: Proposals[]) =>
    proposals
      .map((proposal) => {
        return appendProposalStats({
          proposal,
          ...getProposalsData(proposal.contextKey),
        })
      })

  const [selectedFilter, setSelectedFilter] = useState(ProposalFilter.all)
  const [proposals, setProposals] = useState(proposalsWithMarketData(Proposals))

  useEffect(() => {
    const proposals = proposalsFiltered(selectedFilter)
    setProposals(proposals)
  }, [proposalsData, selectedFilter])

  const onSelectFilter = (filter: ProposalFilter) => {
    if (selectedFilter === filter) return
    setSelectedFilter(filter)
  }

  return (
    <Page>
      <Box w='100%'>
        <PageTitle
          title='Take part in Crypto Oracles DAO Governance'
          subtitle='Take ownership and shape the future of out Proposals'
        />
        <ProposalsFilter
          onSelectFilter={onSelectFilter}
          selected={selectedFilter}
        />
        <ProposalTable proposals={proposals} />
      </Box>
    </Page>
  )
}

export default Proposals
