import { render } from 'utils/testing'

import SignUpForm from './sign-up-form.component'

describe('[Component] SignUpForm', () => {
  const { container } = render(<SignUpForm />)
  const submitButton = container.querySelector(
    'button[type="submit"]'
  ) as Element

  it('Render form with all fields', () => {
    expect(container.querySelectorAll('input').length).toBe(4)
    expect(submitButton).toBeInTheDocument()
  })

  // TODO: Form submit
})
