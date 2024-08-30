# Input Validation Package

This npm package provides input validation for common tasks such as user signup, signin, and blog creation using the [Zod](https://github.com/colinhacks/zod) library. It's designed to be used in both backend and frontend environments, making it versatile and easy to integrate into any project.

## Installation

To install the package, use npm:

```bash
npm install @yoursrijit/medium-common
```

## Usage

Import the validation schemas and types into your application:

```javascript
import { signupInput, signinInput, createBlogInput, updateBlogInput } from '@yoursrijit/medium-common';
```

### Signup Validation

Use `signupInput` to validate signup data. It expects an object with the following structure:

- `name` (optional): A string representing the user's name.
- `email`: A valid email address.
- `password`: A string with a minimum length of 4 characters.

Example:

```javascript
const signupData = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "securePass123"
};

const result = signupInput.safeParse(signupData);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Signup data is valid:", result.data);
}
```

### Signin Validation

Use `signinInput` to validate signin data. It expects an object with the following structure:

- `email`: A valid email address.
- `password`: A string with a minimum length of 4 characters.

Example:

```javascript
const signinData = {
  email: "john.doe@example.com",
  password: "securePass123"
};

const result = signinInput.safeParse(signinData);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Signin data is valid:", result.data);
}
```

### Create Blog Validation

Use `createBlogInput` to validate blog creation data. It expects an object with the following structure:

- `title`: A string representing the blog title.
- `content`: A string representing the blog content.

Example:

```javascript
const blogData = {
  title: "My First Blog",
  content: "This is the content of my first blog."
};

const result = createBlogInput.safeParse(blogData);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Blog creation data is valid:", result.data);
}
```

### Update Blog Validation

Use `updateBlogInput` to validate blog update data. It expects an object with the following structure:

- `id`: A string representing the blog ID.
- `title`: A string representing the blog title.
- `content`: A string representing the blog content.

Example:

```javascript
const updateData = {
  id: "blog123",
  title: "Updated Blog Title",
  content: "Updated blog content."
};

const result = updateBlogInput.safeParse(updateData);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Blog update data is valid:", result.data);
}
```

## Types

This package also exports TypeScript types inferred from the schemas:

- `SignupInput`
- `SigninInput`
- `CreateBlogInput`
- `UpdateBlogInput`

These types can be used to type your data in TypeScript, ensuring that your code stays type-safe.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
