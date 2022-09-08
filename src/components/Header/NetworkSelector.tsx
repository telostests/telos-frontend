import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import TELOS_LOGO from '../../assets/images/telos-logo.png'
import WAX_LOGO from '../../assets/images/wax-logo.png'
import TRUST_LOGO from '../../assets/images/trust-logo.png'


const StyledMenuButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg1};

  padding: 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`
const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 18.125rem;
    right: -46px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 18.125rem;
    top: -22rem;
  `};
`

const NetworkImg = styled.img`
  display: inline;
  max-height: 100%;
  margin-right: 10px;
`

const NetworkRow = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`

const StyledTextSpan = styled.span`
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  white-space: nowrap !important;
  :hover {
    cursor: pointer;
  }
`

const NETWORKS = [
  {
    name: 'Telos EVM Testnet',
    active: true,
    siteURI: 'https://www.trustswap.finance/telos',
    largeSize: '25',
    smallSize: '20',
    logoURI: TELOS_LOGO
  },
  {
    name: 'Trust EVM Testnet',
    active: false,
    largeSize: '25',
    smallSize: '20',
    siteURI: 'https://www.trustswap.finance/',
    logoURI: TRUST_LOGO
  },
 {
    name: 'WAX Testnet (soon)',
    active: false,
    largeSize: '25',
    smallSize: '20',
    siteURI: 'https://www.trustswap.finance/',
    logoURI: WAX_LOGO
  }
]
export default function NetworkSelector() {
  const node = useRef<HTMLDivElement>()
  const [open, setOpen] = useState(false)

  const currentNetwork = NETWORKS.filter(it => it.active)[0]

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (node.current && !node.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={() => setOpen(!open)} id="open-network-dialog-button">
        <NetworkRow>
          <NetworkImg src={currentNetwork.logoURI} width={currentNetwork.smallSize} height={currentNetwork.smallSize} />
          <StyledTextSpan>{currentNetwork.name}</StyledTextSpan>
        </NetworkRow>
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={600} fontSize={14}>
              Switch Network
            </Text>

            {NETWORKS.filter(n => !n.active).map(network => (
              <NetworkRow key={network.name} onClick={() => (window.location.href = network.siteURI)}>
                <NetworkImg src={network.logoURI} width={network.largeSize} height={network.largeSize} />
                <StyledTextSpan>{network.name}</StyledTextSpan>
              </NetworkRow>
            ))}
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
