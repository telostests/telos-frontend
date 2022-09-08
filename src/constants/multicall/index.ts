import { ChainId } from '@trustevm/sdk-tlos'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x5692393F10198a2A5A4b1E8998E9bb16D02B20C7',
  [ChainId.AMBER]: '0x5692393F10198a2A5A4b1E8998E9bb16D02B20C7'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
