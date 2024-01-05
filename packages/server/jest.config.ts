import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/tests/**/*.ts?(x)',
        '**/?(*.)+(spec|test).ts?(x)',
    ],
};

export default config;
