import { ZeroExApi } from '@indexcoop/flash-mint-sdk'

import {
  getIndexApiHeaders,
  ZeroExApiBaseUrl,
  ZeroExAffiliateAddress,
} from 'constants/server'

export function getConfiguredZeroExApi(swapPathOverride: string): ZeroExApi {
  const headers = getIndexApiHeaders()
  return new ZeroExApi(
    `${ZeroExApiBaseUrl}`,
    ZeroExAffiliateAddress,
    headers,
    swapPathOverride
  )
}
