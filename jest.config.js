

      export default {
            testEnvironment: 'node',
            transform: {
              '^.+\\.js$': 'babel-jest'
            },
            moduleNameMapper: {
              '^src/(.*)$': '<rootDir>/src/$1'
            }
          };
          