import { render, screen, fireEvent, act } from 'utils/testing'

import { setCartItems, setIsCartOpen } from 'features/cart/cart.slice'
import CartIcon from './cart-icon.component'
import store from 'app/store'
import mockCartItems from 'mocks/cart-items'

const mockDispatchFn = jest.fn()

jest.mock('hooks/redux', () => ({
  ...jest.requireActual('hooks/redux'),
  useAppDispatch: () => mockDispatchFn,
}))

describe('[Component] CartIcon', () => {
  beforeEach(() => render(<CartIcon />))
  afterEach(() => jest.clearAllMocks())

  it('Render icon with cart count at 0', () => {
    expect(screen.getByText(/shopping-bag.svg/i)).toBeInTheDocument()
    expect(screen.getByText(0)).toBeInTheDocument()
  })

  it('Sum added items to cart count', () => {
    act(() => {
      store.dispatch(setCartItems(mockCartItems))
    })

    expect(screen.getByText(9)).toBeInTheDocument()
  })

  it('Dispatch open/close cart action when clicked', async () => {
    const { isCartOpen } = store.getState().cart

    const iconContainer = screen.getByText(/shopping-bag.svg/i)
      .parentElement as HTMLElement

    expect(isCartOpen).toBe(false)
    fireEvent.click(iconContainer)

    expect(mockDispatchFn).toHaveBeenCalledWith(setIsCartOpen(true))
    // FIX: Needs to fix this.
    // https://stackoverflow.com/questions/72536539/mocked-dispatch-being-fired-but-state-not-changing
    // expect(isCartOpen).toBe(true)
  })
})
