# Angular Portfolio UI

Professional portfolio frontend application built with Angular 18, Bootstrap 5, and Font Awesome.

## ✨ Features

- **Modern Angular 18**: Latest Angular framework with standalone components
- **Responsive Design**: Bootstrap 5.3.3 for mobile-first approach
- **Font Awesome 6.4**: Comprehensive icon library
- **Type-Safe**: Full TypeScript support with strict mode
- **Modular Architecture**: Feature-based component structure
- **HTTP Interceptors**: Error handling and request/response processing
- **RxJS Observables**: Reactive data management
- **Environment-Based Configuration**: Dev and production configs
- **Performance Optimized**: Tree-shaking and lazy loading ready

## 🛠️ Technology Stack

- **Angular**: 18.0.0
- **TypeScript**: 5.4.0
- **Bootstrap**: 5.3.3
- **Font Awesome**: 6.4.0
- **RxJS**: 7.8.1
- **Node.js**: 18+ LTS

## 📁 Project Structure

```
angular/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   ├── services/       # API services
│   │   │   └── interceptors/   # HTTP interceptors
│   │   ├── features/
│   │   │   └── components/     # Feature components
│   │   ├── shared/
│   │   │   └── components/     # Reusable components
│   │   ├── app.component.*     # Root component
│   │   └── app.routes.ts       # Route configuration
│   ├── environments/           # Environment configs
│   ├── styles.scss             # Global styles
│   ├── main.ts                 # Application entry point
│   └── index.html              # HTML template
├── angular.json                # Angular CLI config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── .editorconfig               # Editor settings
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 18+ (optional): `npm install -g @angular/cli`

### Installation

1. **Install Dependencies**
   ```bash
   cd angular
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   Application will be available at `http://localhost:4200`

3. **Build for Production**
   ```bash
   npm run build:prod
   ```
   Output will be in `dist/portfolio-ui/`

## 📝 Configuration

### Environment Configuration

**Development** (`src/environments/environment.ts`):
```typescript
apiUrl: 'http://localhost:8080/api'
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
apiUrl: 'https://api.yourportfolio.com/api'
```

Update API URLs based on your backend server location.

## 🧩 Components

### App Component (`app.component.*`)
- Root component
- Manages main layout
- Scroll-to-top functionality

### Navbar Component (`shared/components/navbar/`)
- Fixed navigation bar
- Smooth scrolling to sections
- Responsive mobile menu
- Social media links

### Profile Component (`features/components/profile/`)
- Hero section with profile image
- Name, title, and bio
- Call-to-action buttons

### Education Component (`features/components/education/`)
- Education timeline
- Degree, institution, dates
- GPA and descriptions

### Skills Component (`features/components/skills/`)
- Categorized skill list
- Proficiency levels with progress bars
- Endorsement counts

### Experience Component (`features/components/experience/`)
- Professional timeline
- Job titles, companies, dates
- Responsibilities and technologies

### Footer Component (`shared/components/footer/`)
- Quick links
- Social media links
- Copyright information

## 🔧 Services

### PortfolioService (`core/services/portfolio.service.ts`)
- Fetches profile data
- Manages education, skills, experience
- Contact form submission
- Observable streams for reactive updates

### HTTP Error Interceptor (`core/interceptors/http-error.interceptor.ts`)
- Centralized error handling
- Status code handling (401, 403, 404, 500)
- Error logging

## 🎨 Styling

- **Global Styles**: `src/styles.scss`
- **Component Styles**: `.scss` files per component
- **Bootstrap Integration**: Via npm package
- **CSS Variables**: Root theme colors and values

## 📦 Available Scripts

```bash
# Development
npm start              # Start dev server with auto-reload
npm run dev           # Start with auto-open browser

# Building
npm run build         # Build for production
npm run build:prod    # Build with optimization

# Development Tools
npm run watch         # Watch mode for development
npm run lint          # Run linting
npm run test          # Run unit tests
npm run e2e           # Run end-to-end tests

# Analysis
npm run analyze       # Analyze bundle size
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run e2e
```

### Coverage Report
```bash
npm run test -- --code-coverage
```

## 🔒 Security

- **No Hardcoded Secrets**: Use environment variables
- **HTTPS Ready**: Application supports HTTPS
- **CORS Enabled**: Configured for backend communication
- **XSS Protection**: Angular's built-in sanitization
- **Content Security Policy**: Ready for implementation

## 🚢 Deployment

### Docker Support

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/portfolio-ui ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080"]
```

### Build Command for Production
```bash
npm run build:prod
# Optimized output in dist/portfolio-ui/
```

### Serve Production Build Locally
```bash
npm install -g http-server
http-server dist/portfolio-ui/ -p 8080
```

## 🔗 Backend Integration

The application communicates with Spring Boot backend at:
- Development: `http://localhost:8080/api`
- Production: Configure in environment files

### API Endpoints Expected

```
GET    /api/profile         # Get profile data
GET    /api/education       # Get education list
GET    /api/skills          # Get skills list
GET    /api/experience      # Get experience list
POST   /api/contact         # Submit contact form
GET    /api/actuator/health # Health check
```

## 📱 Responsive Design

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

All components are optimized for each breakpoint.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1 AA)
- Focus management

## 🐛 Troubleshooting

### Port Already in Use
```bash
ng serve --port 4300
```

### Module Not Found
```bash
npm install
```

### Build Errors
```bash
npm run build -- --verbose
```

### CORS Issues
Ensure backend is configured to accept requests from `http://localhost:4200`

## 📚 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Font Awesome Icons](https://fontawesome.com/icons)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and commit: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Hussein Nour**
- Email: husseinnour469@gmail.com
- LinkedIn: [Hussein Nour](https://linkedin.com)
- GitHub: [Hussein Nour](https://github.com)

## 📈 Roadmap

- [ ] Add blog section
- [ ] Implement dark mode toggle
- [ ] Add project showcase with filtering
- [ ] Multi-language support (i18n)
- [ ] Animation library integration (Framer Motion equivalent)
- [ ] PWA support
- [ ] Search functionality
- [ ] Analytics integration

## 🎉 Support

For issues or questions, please open a GitHub issue or contact via email.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Status**: Production Ready
