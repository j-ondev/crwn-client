import { render, screen } from 'utils/testing'

import type { CartItem as TCartItem } from 'features/cart/cart.types'
import CartItem from './cart-item.component'
import mockCartItems from 'mocks/cart-items'

describe('[Component] CartItem', () => {
  it('Render cart item correctly', () => {
    render(<CartItem cartItem={mockCartItems[0]} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(/brown brim/i)).toBeInTheDocument()
    expect(screen.getByText('1 x $25')).toBeInTheDocument()
  })

  it('Show item with default image when no image_url is provided', () => {
    const cartItemWithoutImage: TCartItem = {
      ...mockCartItems[0],
      image_url: undefined,
    }

    render(<CartItem cartItem={cartItemWithoutImage} />)

    expect(screen.getByRole('img')).toHaveAttribute('src', 'no-image.png')
  })
})
