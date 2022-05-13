import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CartIcon from 'components/cart-icon/cart-icon.component'
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component'

import { selectIsCartOpen } from 'redux/cart/cart.selector'
import { setCurrentUser } from 'redux/user/user.slice'
import { selectCurrentUser } from 'redux/user/user.selector'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles'

const Navigation = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const currentUser = useSelector(selectCurrentUser)

  const signOutHandler = () => {
    localStorage.removeItem('accessToken')
    dispatch(setCurrentUser(null))
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
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
