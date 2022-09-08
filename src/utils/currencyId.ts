import { Currency, ETHER, Token } from '@trustevm/sdk-tlos'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'TLOS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
