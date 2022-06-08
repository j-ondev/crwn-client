// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'jest-styled-components'

// This has to be defined
// Even with @types/google.accounts, jest says that google is not defined.
global.google = {
  accounts: {
    id: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      renderButton: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      cancel: () => {},
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any
