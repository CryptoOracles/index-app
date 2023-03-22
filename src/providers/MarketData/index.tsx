import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  ETH,
  MetaverseIndex,
  Token,
} from 'constants/tokens'
import { fetchHistoricalTokenMarketData } from 'utils/api/coingeckoApi'

export interface TokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
}

export interface TokenContext {
  dseth?: TokenMarketDataValues
  eth?: TokenMarketDataValues
  index?: TokenMarketDataValues
  dpi?: TokenMarketDataValues
  gmi?: TokenMarketDataValues
  mvi?: TokenMarketDataValues
  bed?: TokenMarketDataValues
  ethfli?: TokenMarketDataValues
  btcfli?: TokenMarketDataValues
  iceth?: TokenMarketDataValues
  getMarketDataBySymbol: (token: Token) => TokenMarketDataValues | null
  selectLatestMarketData: (...args: any) => number
  selectMarketDataByToken: (token: Token) => number[][]
}

export type TokenContextKeys = keyof TokenContext

export const MarketDataContext = createContext<TokenContext>({
  getMarketDataBySymbol: () => null,
  selectLatestMarketData: () => 0,
  selectMarketDataByToken: () => [[]],
})

export const useMarketData = () => useContext(MarketDataContext)

export const MarketDataProvider = (props: { children: any }) => {
  const [ethMarketData, setEthMarketData] = useState<any>({})
  const [mviMarketData, setMviMarketData] = useState<any>({})

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  const selectMarketDataByToken = (token: Token) => {
    switch (token) {
      case MetaverseIndex:
        return mviMarketData
      default:
        return 0
    }
  }

  const getMarketDataBySymbol = (
    token: Token
  ): TokenMarketDataValues | null => {
    switch (token) {
      case MetaverseIndex:
        return mviMarketData
      default:
        return null
    }
  }

  const fetchMarketData = useCallback(async () => {
    const marketData = await Promise.all([
      fetchHistoricalTokenMarketData(ETH.coingeckoId),
      fetchHistoricalTokenMarketData(MetaverseIndex.coingeckoId),
    ])

    setEthMarketData(marketData[0])
    setMviMarketData(marketData[1])
  }, [])

  useEffect(() => {
    fetchMarketData()
  }, [fetchMarketData])

  return (
    <MarketDataContext.Provider
      value={{
        getMarketDataBySymbol,
        selectLatestMarketData,
        selectMarketDataByToken,
        eth: ethMarketData,
        mvi: mviMarketData,
      }}
    >
      {props.children}
    </MarketDataContext.Provider>
  )
}
