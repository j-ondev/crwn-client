import { render, screen } from 'utils/testing'
import userEvent from '@testing-library/user-event'

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from 'helpers/cart'
import { setCartItems } from 'features/cart/cart.slice'
import CheckoutItem from './checkout-item.component'
import mockCartItems from 'mocks/cart-items'

const mockDispatchFn = jest.fn()

jest.mock('hooks/redux', () => ({
  ...jest.requireActual('hooks/redux'),
  useAppDispatch: () => mockDispatchFn,
}))

describe('[Component] CheckoutItem', () => {
  beforeEach(() => render(<CheckoutItem cartItem={mockCartItems[0]} />))

  it('Rendering list item correctly', () => {
    expect(screen.getByAltText(/brown brim/i)).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('Adding 1 into item quantity when clicked', () => {
    userEvent.click(screen.getByText(1).nextSibling as Element)
    expect(mockDispatchFn).toHaveBeenCalledWith(
      setCartItems(addItemToCart([], mockCartItems[0]))
    )
  })

  it('Removing 1 from item quantity when clicked', () => {
    userEvent.click(screen.getByText(1).previousSibling as Element)
    expect(mockDispatchFn).toHaveBeenCalledWith(
      setCartItems(removeItemFromCart([], mockCartItems[0]))
    )
  })

  it('Clearing item from the list when clicked', () => {
    userEvent.click(screen.getByRole('button'))
    expect(mockDispatchFn).toHaveBeenCalledWith(
      setCartItems(clearItemFromCart([], mockCartItems[0]))
    )
  })
})
