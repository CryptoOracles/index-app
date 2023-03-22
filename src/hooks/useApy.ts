import { useCallback, useEffect, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'

import { IndexApi } from 'utils/api/indexApi'
import { IndexCoopApiBaseUrl } from 'constants/server'

export const useApy = (symbol: string): { apy: BigNumber } => {
  const [apy, setApy] = useState(BigNumber.from(0))

  const fetchApy = useCallback(async () => {
    try {
      const indexApi = new IndexApi()
      const { apy } = await indexApi.get(`${IndexCoopApiBaseUrl}/${symbol.toLowerCase()}/apy`)
      setApy(BigNumber.from(apy))
      console.log(apy)
    } catch (err) {
      console.log(err)
    }
  }, [symbol])

  useEffect(() => {
    fetchApy()
  }, [fetchApy])

  return { apy }
}
