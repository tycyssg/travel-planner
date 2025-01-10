module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>/test',
    '/node_modules/',
    '<rootDir>\\/.*\\.spec\\..*',
    '/dto/'
  ],
  testMatch: ['<rootDir>/test/**/*.integration-spec.{ts,js}'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageDirectory: './coverage',
  coverageReporters: [
    'text',
    ['cobertura', { file: 'cobertura-integration-coverage.xml' }]
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-output',
        outputName: 'integration-test-report.xml'
      }
    ]
  ],
};
