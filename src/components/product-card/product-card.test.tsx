import { render, screen, fireEvent } from 'utils/testing'

import ProductCard from './product-card.component'
import mockCategories from 'mocks/categories'

import { setCartItems } from 'features/cart/cart.slice'
import { addItemToCart } from 'helpers/cart'

const mockDispatchFn = jest.fn()

jest.mock('hooks/redux', () => ({
  ...jest.requireActual('hooks/redux'),
  useAppDispatch: () => mockDispatchFn,
}))

describe('[Component] ProductCard', () => {
  const product = mockCategories[0].items[0]
  beforeEach(() => render(<ProductCard product={product} />))

  it('Render product card with hidden button', () => {
    expect(screen.getByRole('img', { name: /brown brim/i })).toBeInTheDocument()
    expect(screen.getByText(/brown brim/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { hidden: true })).not.toBeVisible()
  })

  it('Dispatch new product to cart when button is clicked', () => {
    const button = screen.getByRole('button', { hidden: true })

    fireEvent.click(button)

    expect(mockDispatchFn).toHaveBeenCalledWith(
      setCartItems(addItemToCart([], product))
    )
  })
})
