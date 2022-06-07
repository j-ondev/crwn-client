import { render, screen } from 'utils/testing'

import Button, { BUTTON_TYPE_CLASSES } from './button.component'

describe('[Component] Button', () => {
  it('Render button with base style', () => {
    render(<Button />)

    expect(screen.getByRole('button')).toHaveStyle({
      color: 'white',
      backgroundColor: 'black',
    })
  })

  it('Render button with inverted style', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />)

    expect(screen.getByRole('button')).toHaveStyle({
      color: 'black',
      backgroundColor: 'white',
    })
  })

  it('Show spinner while loading', () => {
    render(<Button isLoading={true}>Button Text</Button>)

    expect(screen.getByRole('button')).not.toHaveTextContent(/button text/i)
  })
})
