import { render, screen } from 'utils/testing'

import mockCategories from 'mocks/categories'
import CategoryItem from './category-item.component'

describe('[Component] CategoryItem', () => {
  it('Render item correctly', () => {
    render(<CategoryItem category={mockCategories[0]} />)

    const heading = screen.getByRole('heading')
    const bgImage = heading.parentElement?.previousElementSibling

    expect(heading).toHaveTextContent('hats')
    expect(bgImage).toHaveStyleRule(
      'background-image',
      `url(${mockCategories[0].image_url})`
    )
    expect(screen.getByText(/shop now/i)).toBeInTheDocument()
  })
})
