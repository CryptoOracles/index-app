import { useState } from 'react'

import { utils } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'

import { FlashMintPerp } from 'constants/ethContractAddresses'
import { Token } from 'constants/tokens'
import { useWallet } from 'hooks/useWallet'
import { ISSUANCE_ABI } from 'utils/abi/Issuance'

const ISSUANCEInterface = new utils.Interface(ISSUANCE_ABI)

/**
 * Approve the spending of an ERC20
 */
export const useIssuanceQuote = (
  isIssue: Boolean,
  token?: Token,
  amount?: BigNumber
) => {
  const { signer } = useWallet()
  const [estimatedUSDC, setEStimatedUSDC] = useState<BigNumber>(
    BigNumber.from('0')
  )
  const getQuote = async () => {
    if (!signer || !token?.optimismAddress || amount?.eq(BigNumber.from('0'))) {
      return
    }
    try {
      const contract = new Contract(FlashMintPerp, ISSUANCEInterface, signer)
      if (isIssue) {
        const quote =
          await contract.callStatic.getUsdcAmountInForFixedSetOffChain(
            token.optimismAddress,
            amount
          )
        setEStimatedUSDC(BigNumber.from(quote.toString()))
      } else {
        const quote =
          await contract.callStatic.getUsdcAmountOutForFixedSetOffChain(
            token.optimismAddress,
            amount
          )
        const quoteWithSlippage = BigNumber.from(quote.toString())
          .mul(99)
          .div(100)
        setEStimatedUSDC(quoteWithSlippage)
      }
    } catch (error) {
      console.log('Error getting quote for perp issuance', error)
      return
    }
  }

  return {
    estimatedUSDC,
    getQuote,
  }
}
