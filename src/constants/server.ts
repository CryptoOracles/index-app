export const AlchemyApiKey = process.env.REACT_APP_ALCHEMY_ID
export const AlchemyMainnetUrl = `https://eth-mainnet.alchemyapi.io/v2/${AlchemyApiKey}`

export const ZeroExApiBaseUrl = 'https://api.0x.org'
export const CoinGeckoApiBaseUrl = 'https://api.coingecko.com/api/v3'
export const IndexCoopApiBaseUrl = "https://api.indexcoop.com"

export const ZeroExAffiliateAddress =
  '0x37e6365d4f6aE378467b0e24c9065Ce5f06D70bF'

export function getIndexApiHeaders() {
  return undefined
}
