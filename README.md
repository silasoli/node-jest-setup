# Node.js Jest Setup with TypeScript

This repository demonstrates how to set up automated testing in a Node.js project using Jest with TypeScript. The guide walks through the process of project initialization, configuration, and test implementation.

---

## **Step-by-Step Setup**

### 1. **Initialize the Project**
Start by creating a new Node.js project:
```bash
npm init -y
```
This command generates a `package.json` file to manage dependencies and project metadata.

---

### 2. **Install Dependencies**
Install the necessary development dependencies:
```bash
npm i -D typescript jest ts-jest @types/jest ts-node
```
- **TypeScript**: Adds TypeScript support.
- **Jest**: A testing framework.
- **ts-jest**: Provides TypeScript support for Jest.
- **@types/jest**: TypeScript definitions for Jest.
- **ts-node**: Runs TypeScript files directly.

---

### 3. **Configure Jest**
Set up Jest to work with TypeScript using `ts-jest`:
```bash
npx ts-jest config:init
```
This creates a `jest.config.ts` file. Update it to the following configuration:
```typescript
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true
};

export default config;
```
- **preset**: Ensures Jest works with TypeScript.
- **testEnvironment**: Specifies the environment for running tests (Node.js in this case).
- **verbose**: Enables detailed test output.

---

### 4. **Configure TypeScript**
Create a `tsconfig.json` file to define TypeScript settings:
```json
{
    "compilerOptions": {
        "esModuleInterop": true
    }
}
```
- **esModuleInterop**: Enables compatibility between CommonJS and ES modules.

---

### 5. **Set Up Project Structure**
Organize your project files into the following structure:
```
src/
├── app/
│   └── Utils.ts
├── test/
│   └── Utils.test.ts
jest.config.ts
package.json
tsconfig.json
```
- **app/**: Contains source code.
- **test/**: Contains test files.

---

### 6. **Create a Utility Function**
Add a simple utility function to `src/app/Utils.ts`:
```typescript
export function toUpperCase(arg: string): string {
    return arg.toUpperCase();
}
```

---

### 7. **Write Tests**
Write a test for the utility function in `src/test/Utils.test.ts`:
```typescript
import { toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
    test('should return upper case', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    });
});
```
- **describe**: Groups related tests.
- **test**: Defines an individual test case.
- **expect**: Asserts the expected outcome.

---

### 8. **Add Test Script**
Update the `package.json` file with a script to run tests:
```json
"scripts": {
    "test": "jest"
}
```

---

### 9. **Run Tests**
Execute the tests using the following command:
```bash
npm run test
```
Jest will execute all test files and display the results in the terminal.

---

## **Key Features of This Setup**
1. **TypeScript Integration**: Seamlessly integrates TypeScript with Jest.
2. **Clear File Structure**: Separates source code and test files for better organization.
3. **Reusable Configuration**: Easily extendable for larger projects.