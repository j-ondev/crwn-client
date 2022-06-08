import { render } from 'utils/testing'

import SignInForm from './sign-in-form.component'

describe('[Component] SignInForm', () => {
  const { container } = render(<SignInForm />)
  const submitButton = container.querySelector(
    'button[type="submit"]'
  ) as Element

  it('Render form with all fields', () => {
    expect(container.querySelectorAll('input').length).toBe(2)
    expect(submitButton).toBeInTheDocument()
  })

  // TODO: Form submit
  // it('Handle submit is working', () => {
  //   const emailInput = container.querySelector('input[name="in_email"]')!
  //   const pwdInput = container.querySelector('input[name="in_password"]')!

  //   userEvent.type(emailInput, '')
  //   userEvent.type(pwdInput, '')
  //   userEvent.click(submitButton)
  // })
})
