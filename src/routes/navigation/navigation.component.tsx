import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import CartIcon from 'components/cart-icon/cart-icon.component'
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component'

import { selectIsCartOpen } from 'features/cart/cart.selector'
import { setUser } from 'features/user/user.slice'
import { selectUser } from 'features/user/user.selector'

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  CrwnLogo,
} from './navigation.styles'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const isCartOpen = useAppSelector(selectIsCartOpen)
  const user = useAppSelector(selectUser)

  const signOutHandler = () => {
    dispatch(setUser(null))
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {user ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
