# Contributing to Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Give credit where it's due
- Focus on the code, not the person
- Help others succeed

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/Portfolio.git
   cd Portfolio
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Set Up Development Environment**
   ```bash
   cd backend
   docker-compose up -d
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

## Development Guidelines

### Code Style

- Follow the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use 4 spaces for indentation (Java), 2 spaces for JSON/YAML/HTML
- Run formatter before committing: `./mvnw spotless:apply`
- Max line length: 120 characters

### Naming Conventions

- **Classes**: `PascalCase` (e.g., `UserController`)
- **Methods/Variables**: `camelCase` (e.g., `getUserProfile`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_ATTEMPTS`)
- **Package names**: lowercase (e.g., `com.norman.portfolio`)

### Commit Guidelines

- Use meaningful commit messages
- Format: `type(scope): subject`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(auth): add login endpoint`
- Keep commits small and focused

### Pull Request Process

1. Update the README.md with any new features or changes
2. Add tests for new functionality
3. Ensure all tests pass: `./mvnw test`
4. Run code quality checks: `./mvnw verify`
5. Request review from maintainers
6. Address review comments promptly
7. Squash commits before merging (if requested)

## Creating Tests

### Backend Tests

- Use JUnit 5 and Mockito
- Follow naming convention: `{Class}Tests.java`
- Target: 80%+ code coverage
- Example:

```java
@SpringBootTest
class UserControllerTests {
    
    @MockBean
    private UserService userService;
    
    @Test
    void testGetUserProfile() {
        // Arrange
        User user = new User("test@example.com");
        when(userService.findByEmail("test@example.com")).thenReturn(user);
        
        // Act & Assert
        // Test implementation
    }
}
```

### Frontend Tests

- Use Jest and React Testing Library (if applicable)
- Keep tests focused and simple
- Test user interactions, not implementation details

## Documentation

- Update README.md for user-facing changes
- Add Javadoc comments for public methods
- Include examples in documentation
- Keep CONTRIBUTING.md up to date

### Javadoc Example

```java
/**
 * Retrieves a user profile by email address.
 *
 * @param email the user's email address
 * @return the user profile
 * @throws UserNotFoundException if user is not found
 */
public User getUserProfile(String email) {
    // Implementation
}
```

## Issues and Feature Requests

### Reporting Issues

- Check existing issues first
- Provide clear reproduction steps
- Include environment details (Java version, OS, etc.)
- Add screenshots or error messages
- Use the issue template if available

### Feature Requests

- Describe the use case
- Explain expected behavior
- Consider backward compatibility
- Discuss alternative approaches

## Running Tests Locally

### Backend Tests

```bash
cd backend

# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserControllerTests

# Run with coverage report
./mvnw test jacoco:report
# Report: target/site/jacoco/index.html
```

### Code Quality Checks

```bash
# SpotBugs
./mvnw spotbugs:check

# FindBugs
./mvnw findbugs:findbugs

# PMD
./mvnw pmd:check

# CheckStyle
./mvnw checkstyle:check
```

## Performance Guidelines

- Avoid N+1 query problems (use joins/eager loading)
- Implement proper pagination for large datasets
- Use caching for frequently accessed data
- Profile performance with JProfiler or Async Profiler

## Security Guidelines

- Never commit secrets or passwords
- Use environment variables for sensitive data
- Validate all user inputs
- Use parameterized queries (handled by JPA)
- Follow OWASP Top 10 guidelines
- Run security scans: `./mvnw dependency-check:check`

## Release Process

1. Update version in `pom.xml`
2. Update CHANGELOG.md
3. Create git tag: `git tag -a v1.0.0 -m "Release version 1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. GitHub Actions will automatically build and deploy

## Community

- Discussion: GitHub Discussions
- Issues: GitHub Issues
- Documentation: README.md and Wiki
- Contact: husseinnour469@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing! 🎉
