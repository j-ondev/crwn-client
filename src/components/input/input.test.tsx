import { render, screen } from 'utils/testing'

import Input from './input.component'

describe('', () => {
  it('Render input without label and same id and name', () => {
    const { container } = render(<Input name="test-input" />)
    const input = container.querySelector('input')

    expect(input).toHaveProperty('id', 'test-input')
    expect(input).toHaveProperty('name', 'test-input')
    expect(screen.queryByLabelText('Test')).not.toBeInTheDocument()
  })

  it('Render input with label', () => {
    render(<Input name="test-input" label="Test" />)

    expect(screen.getByLabelText('Test')).toBeInTheDocument()
  })
})
