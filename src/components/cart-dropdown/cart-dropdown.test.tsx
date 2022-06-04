import '@testing-library/jest-dom'
import mockCartItems from 'mocks/cart-items'
import { render, screen, fireEvent, act } from 'utils/test'

import store from 'app/store'
import CartDropdown from './cart-dropdown.component'
import { setCartItems } from 'features/cart/cart.slice'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('[Component] CartDropdown', () => {
  beforeEach(() => render(<CartDropdown />))

  it('Starts with cart empty', () => {
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
  })

  it('Showing items when added', () => {
    act(() => {
      store.dispatch(setCartItems(mockCartItems))
    })

    expect(screen.getAllByRole('img').length).toBe(3)
  })

  it('Button redirecting to checkout', () => {
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockedUseNavigate).toHaveBeenCalled()
  })
})
