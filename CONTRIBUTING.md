# Contributing to Contai

First off, thank you for considering contributing to Contai! It's people like you that make Contai such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include error messages if applicable**
* **Include your environment details** (Node version, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how this enhancement would be used**

### Pull Requests

* Fill in the required template
* Follow the JavaScript style guide
* Include comments in your code where necessary
* Update documentation as needed
* Test your changes thoroughly

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/frederickabrah/Contai.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes and test thoroughly
6. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a Pull Request

## Coding Guidelines

### JavaScript Style Guide

* Use ES6+ features where appropriate
* Use async/await for asynchronous code
* Use meaningful variable names
* Add comments for complex logic
* Keep functions small and focused
* Use JSDoc comments for functions

Example:
```javascript
/**
 * Generate viral content based on topic and platform
 * @param {string} topic - The content topic
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated content
 */
const generateContent = async (topic, platform = 'twitter') => {
  // Your implementation
};
```

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example:
```
feat: Add LinkedIn platform support

- Added LinkedIn-specific prompt templates
- Updated platform detection logic
- Added LinkedIn examples to documentation

Closes #123
```

## Documentation

* Update README.md for user-facing changes
* Update CONFIG_GUIDE.md for configuration changes
* Update COMMANDS.md for new commands
* Add examples for new features

## Testing

Before submitting a pull request, test your changes:

1. Test all affected commands
2. Test with different config templates
3. Test on different platforms (Twitter, LinkedIn, etc.)
4. Verify output quality

## Questions?

Feel free to open an issue with the "question" label if you have any questions about contributing.

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
