# Zode Signup Validator

A simple npm package for validating signup inputs using [Zod](https://github.com/colinhacks/zod).

## Installation

You can install this package via npm:

```bash
npm i @yoursrijit/common
```

# Usage
This package can be used for both server-side and client-side validation. Below is an example of how to use it in a Node.js environment.

# Server-side Validation
```
const { signupInput } = require('@yoursrijit/common');

// Sample input object
const input = {
  username: 'john_doe',
  password: 'securepassword123'
};

try {
  signupInput.safeParse(input);
  console.log('Validation successful');
} catch (e) {
  console.error('Validation failed:', e.errors);
}

```
# Client-side Validation
```
import { signupInput } from '@yoursrijit/common';

// Sample input object
const input = {
  username: 'john_doe',
  password: 'securepassword123'
};

try {
  signupInput.safeParse(input);
  console.log('Validation successful');
} catch (e) {
  console.error('Validation failed:', e.errors);
}

```
# Types
You can also infer the TypeScript types from the validation schema:
```
import { signupParam } from '@yoursrijit/common';

const input: signupParam = {
  username: 'john_doe',
  password: 'securepassword123'
};

// Now `input` is strongly typed and you can use it throughout your codebase.

```
# Features
- Server-side and Client-side Validation: Use the same  - - schema for both server-side and client-side validation.
- TypeScript Support: Automatically infer TypeScript types from the validation schema.
- Simple and Easy to Use: Minimal configuration required.

# License
This project is licensed under the MIT License.
