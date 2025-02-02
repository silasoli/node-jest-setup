import type { Config } from  "@jest/types";

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    // watch: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/app/**/*.ts',
    ]
}

export default config;