import { render, screen } from 'utils/testing'

import CategoryContainer from './categories-container.component'
import mockCategories from 'mocks/categories'

describe('[Component] CategoriesContainer', () => {
  it('Loading all category items', () => {
    render(<CategoryContainer categories={mockCategories} />)
    expect(screen.getAllByRole('link').length).toBe(3)
  })

  it('Rendering text and links', () => {
    render(<CategoryContainer categories={[mockCategories[0]]} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/shop/hats')
    expect(screen.getByRole('heading')).toHaveTextContent('hats')
    expect(screen.getByText(/shop now/i)).toBeInTheDocument()
  })
})
