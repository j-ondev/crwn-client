import { render, screen } from 'utils/testing'

import CategoryPreview from './category-preview.component'
import mockCategories from 'mocks/categories'

describe('[Component] CategoryPreview', () => {
  it('Render category with product', () => {
    const { title, product } = {
      title: mockCategories[0].title,
      product: mockCategories[0].items[0],
    }
    render(<CategoryPreview title={title} products={[product]} />)

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveTextContent(/hats/i)
    expect(screen.getByText(25)).toBeInTheDocument()
  })
})
