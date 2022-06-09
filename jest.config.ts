import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  // transform: { '^.+\\.tsx?$': 'ts-jest' },
  rootDir: 'src',
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: [
    '<rootDir>/mocks',
    '<rootDir>/utils',
    '<rootDir>/hooks',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
}

export default config
