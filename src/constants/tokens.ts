import fixedDaiLogo from 'assets/fixed_dai_logo.png'
import fixedUsdcLogo from 'assets/fixed_usdc_logo.png'
import { TokenContextKeys } from 'providers/MarketData'

import { MAINNET } from './chains'

export const dpiTokenImage =
  'https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'

export enum IndexType {
  thematic = 'thematic',
  leverage = 'leverage',
  yield = 'yield',
}

export interface Token {
  name: string
  symbol: string
  address: string | undefined
  polygonAddress: string | undefined
  optimismAddress: string | undefined
  decimals: number
  // Url path for the token
  url: string
  image: string
  coingeckoId: string
  tokenContextKey?: TokenContextKeys
  fees:
    | { streamingFee: string; mintFee?: string; redeemFee?: string }
    | undefined
  isDangerous: boolean
  indexTypes: IndexType[]
  defaultChain?: number
  isPerp?: boolean
}

/**
 * Indices
 */

export const MetaverseIndex: Token = {
  name: 'Metaverse Index',
  symbol: 'MVI',
  address: '0x72e364F2ABdC788b7E918bc238B21f109Cd634D7',
  polygonAddress: '0xfe712251173A2cd5F5bE2B46Bb528328EA3565E1',
  optimismAddress: undefined,
  decimals: 18,
  url: 'mvi',
  image: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
  coingeckoId: 'metaverse-index',
  tokenContextKey: 'mvi',
  fees: {
    streamingFee: '0.95%',
  },
  isDangerous: false,
  indexTypes: [IndexType.thematic],
  defaultChain: MAINNET.chainId,
}

/**
 * Other
 */

export const DAI: Token = {
  name: 'Dai',
  symbol: 'DAI',
  image:
    'https://assets.coingecko.com/coins/images/9956/large/4943.png?1636636734',
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  polygonAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  optimismAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  decimals: 18,
  url: '',
  coingeckoId: 'dai',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
}

export const ETH: Token = {
  name: 'Ethereum',
  symbol: 'ETH',
  image:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  polygonAddress: '',
  optimismAddress: '',
  decimals: 18,
  url: '',
  coingeckoId: 'ethereum',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
}

export const MATIC: Token = {
  name: 'Matic',
  symbol: 'MATIC',
  image:
    'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
  address: undefined,
  polygonAddress: '0x0000000000000000000000000000000000001010',
  optimismAddress: undefined,
  decimals: 18,
  url: '',
  coingeckoId: 'matic-network',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
}

export const USDC: Token = {
  name: 'USD Coin',
  symbol: 'USDC',
  image:
    'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  polygonAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  optimismAddress: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
  decimals: 6,
  url: '',
  coingeckoId: 'usd-coin',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
}

export const WETH: Token = {
  name: 'Wrapped Ether',
  symbol: 'WETH',
  image:
    'https://assets.coingecko.com/coins/images/2518/large/weth.png?1628852295',
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  polygonAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  optimismAddress: '0x4200000000000000000000000000000000000006',
  decimals: 18,
  url: '',
  coingeckoId: 'weth',
  fees: undefined,
  isDangerous: false,
  indexTypes: [],
}

/**
 * Currencies
 */

// Add new currencies here as well to fetch all balances
export const currencies = [DAI, USDC]

export const mainnetCurrencyTokens = [ETH, DAI, USDC, WETH]

export const polygonCurrencyTokens = [MATIC, DAI, USDC, WETH]

// MNYe only works with USDC, will have to optimize this once there is new indices on Optimism
export const optimismCurrencyTokens = [USDC]

/**
 * Lists
 */

// Deprecated/rebalanced indicies will not work with FlashMintLeveraged any longer
export const eligibleLeveragedExchangeIssuanceTokens: Token[] = [ 
]

const isDevEnv =
  process.env.REACT_APP_VERCEL_ENV === 'development' ||
  process.env.REACT_APP_VERCEL_ENV === 'index-app-staging'
// FIXED is not supposed to be released to the public yet, so we create a
// separate list for dev/staging and production
const indexNames = isDevEnv
  ? [
      MetaverseIndex,
    ]
  : [
      MetaverseIndex,
    ]

export const indexNamesMainnet = indexNames.filter((index) => index.address)
export const indexNamesPolygon = indexNames.filter(
  (index) =>
    index.polygonAddress
)

// FlashMint specific lists
export const flashMintIndexesMainnetRedeem = indexNames.filter(
  (index) => index.address
)

export const flashMintIndexesPolygon = indexNames.filter(
  (index) =>
    index.polygonAddress &&
    index.symbol !== MetaverseIndex.symbol
)

export const flashMintIndexesPolygonRedeem = indexNames.filter(
  (index) =>
    index.polygonAddress &&
    index.symbol !== MetaverseIndex.symbol
)

export default indexNames
