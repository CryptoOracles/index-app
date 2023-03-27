import { useColorStyles, useICColorMode } from 'styles/colors'

import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import { ProposalOptionsValues, ProposalsTable } from '../'

import PerformanceCell from './PerformanceCell'
import TickerCell from './TickerCell'

type ProposalsTableProps = {
  proposals: ProposalsTable[]
}

const ProductsTable = ({ proposals: products }: ProposalsTableProps) => {
  const { isDarkMode } = useICColorMode()
  const { styles } = useColorStyles()
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false })

  const colorScheme = isDarkMode ? 'whiteAlpha' : 'blackAlpha'
  const amountOfOptionsToShow = isMobile ? 2 : 3
  const proposalStats = ProposalOptionsValues;

  return (
    <Table colorScheme={colorScheme}>
      <Thead>
        <Tr>
          <Th p={['8px 8px', '12px 24px']}>Ticker</Th>
          {proposalStats.map((interval: any) => (
            <Th key={interval} p={['8px 8px', '12px 24px']}>
              {interval}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.symbol}>
            <Td borderColor={styles.border} p={['16px 8px', '16px 24px']}>
              <TickerCell product={product} />
            </Td>
            {proposalStats.map((interval) => (
              <Td
                borderColor={styles.border}
                key={interval}
                p={['16px 8px', '16px 24px']}
              >
                <PerformanceCell
                  percentChange={product.options?.[interval]}
                />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default ProductsTable
