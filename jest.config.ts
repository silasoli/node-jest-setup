import type { Config } from  "@jest/types";

const baseDir = '<rootDir>/src/app/pass_checker'
const baseTestDir = '<rootDir>/src/test/pass_checker'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    // watch: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`,
    ],
    testMatch: [
        `${baseTestDir}/**/*.test.ts`,
    ],
}

export default config;