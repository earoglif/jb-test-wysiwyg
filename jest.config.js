/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['jest-prosemirror/environment'],
    setupFilesAfterEnv: ['<rootDir>/jest.framework.dom.ts'],
    snapshotSerializers: ['jest-prosemirror/serializer'],
    moduleNameMapper: {
        '^data/(.*)$': '<rootDir>/src/data/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^layout/(.*)$': '<rootDir>/src/layout/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1'
    }
};
