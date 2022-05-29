import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ReactComponent as LogoSvg } from '../../assets/crown.svg'

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 7.5px;
`

export const CrwnLogo = styled(LogoSvg)``

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`