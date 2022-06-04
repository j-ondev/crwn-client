import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  // verbose: true,
  // roots: ['<rootDir>/src'],
  // transform: { '^.+\\.tsx?$': 'ts-jest' },
  // setupFilesAfterEnv: [
  //   '@testing-library/react/cleanup-after-each',
  //   '@testing-library/jest-dom/extend-expect',
  // ],
  // testRegex: '(**/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleDirectories: ['node_modules', 'src/utils'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
}

export default config
