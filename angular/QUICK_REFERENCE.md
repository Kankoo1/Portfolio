# Angular Portfolio - Quick Reference

## 🚀 Quick Start (5 minutes)

```bash
# 1. Install dependencies
cd angular
npm install

# 2. Start development server
npm start

# 3. Open browser
# http://localhost:4200

# 4. Make changes and see live reload
```

## 📁 Quick File Locations

```
src/
├── app/
│   ├── app.component.*              # Root component
│   ├── app.routes.ts                # Routing
│   ├── core/
│   │   ├── services/portfolio.service.ts
│   │   ├── models/portfolio.model.ts
│   │   └── interceptors/
│   ├── features/components/         # Profile, Education, Skills, Experience
│   └── shared/components/           # Navbar, Footer
├── environments/                    # Configuration
├── styles.scss                      # Global styles
└── index.html
```

## 🔧 Common Tasks

### Update API URL
**File**: `src/environments/environment.ts`
```typescript
export const environment = {
  apiUrl: 'http://localhost:8080/api'
};
```

### Modify Component
**Example**: Update navbar
```
src/app/shared/components/navbar/navbar.component.ts   # Logic
src/app/shared/components/navbar/navbar.component.html # Template
src/app/shared/components/navbar/navbar.component.scss # Styles
```

### Create New Component
```bash
ng generate component features/components/projects
# or
ng g c features/components/projects
```

### Create New Service
```bash
ng generate service core/services/projects
# or
ng g s core/services/projects
```

### Update Profile Data
**File**: `src/app/core/models/portfolio.model.ts`

Add/modify interfaces and update PortfolioService.

## 📊 Component Hierarchy

```
AppComponent (root)
├── NavbarComponent
├── ProfileComponent
├── EducationComponent
├── SkillsComponent
├── ExperienceComponent
└── FooterComponent
```

## 🎨 Styling

- **Global**: `src/styles.scss`
- **Component**: `*.component.scss`
- **Variables**: `:root` in `styles.scss`
- **Framework**: Bootstrap 5.3.3

## 🧪 Testing

```bash
npm run test              # Run tests
npm run test:watch       # Watch mode
npm run e2e              # End-to-end tests
npm run lint             # Lint code
```

## 🚢 Build & Deploy

```bash
npm run build            # Development build
npm run build:prod       # Production build (optimized)

# Output: dist/portfolio-ui/
# Deploy this folder to your server
```

## 📦 Dependencies Management

```bash
npm list                 # List installed packages
npm install <package>    # Add package
npm update               # Update all packages
npm outdated             # Show outdated packages
```

## 🐛 Debug Mode

```bash
# Chrome DevTools
ng serve --source-map

# Console logging
console.log('Debug:', variable);
```

## 🔒 Environment Files

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

Build with environment:
```bash
ng build --configuration production
```

## 📱 Responsive Testing

```bash
# Chrome DevTools: Ctrl+Shift+M (Cmd+Shift+M on Mac)
# Test breakpoints: 376px, 768px, 992px, 1200px
```

## ⚡ Performance

```bash
# Check bundle size
npm run analyze

# Build stats
ng build --stats-json
```

## 🔗 API Response Format

**Expected format from backend**:
```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Success"
}
```

**Error response**:
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🎯 Important Files to Know

| File | Purpose |
|------|---------|
| `angular.json` | Build configuration |
| `tsconfig.json` | TypeScript settings |
| `package.json` | Dependencies |
| `src/main.ts` | App bootstrap |
| `src/index.html` | HTML template |
| `src/styles.scss` | Global CSS |
| `src/app/app.routes.ts` | Routes config |
| `.editorconfig` | Code formatting |

## 💡 Tips & Tricks

### Hot Module Replacement
```bash
ng serve --hmr
```

### Analyze Build
```bash
npm run analyze
```

### Tree-Shake Dead Code
Already enabled in production build

### Pre-load Routes
Update `app.routes.ts`:
```typescript
{
  path: 'experience',
  component: ExperienceComponent,
  data: { preload: true }
}
```

## 🚨 Common Errors & Fixes

| Error | Solution |
|-------|----------|
| `Module not found` | `npm install` |
| `Port 4200 in use` | `ng serve --port 4300` |
| `API connection failed` | Check backend is running, CORS enabled |
| `Build fails` | `npm run build -- --verbose` |
| `Tests fail` | `npm run test -- --watch` |

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "Add amazing feature"

# Push to remote
git push origin feature/amazing-feature

# Create pull request on GitHub
```

## 📈 Development Checklist

- [ ] Code compiles without errors
- [ ] Tests pass: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] No console warnings/errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] API integration tested
- [ ] Build successful: `npm run build:prod`

## 🎓 Key Concepts

### Observables (RxJS)
```typescript
// Subscribe to changes
this.service.data$.subscribe(data => {
  this.data = data;
});

// Unsubscribe in ngOnDestroy
this.subscription.unsubscribe();
```

### Dependency Injection
```typescript
constructor(private service: PortfolioService) {}
```

### TypeScript Interfaces
```typescript
interface Profile {
  name: string;
  title: string;
}
```

## 📞 Quick Links

- [Angular CLI](https://angular.io/cli)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- [RxJS](https://rxjs.dev/)
- [Font Awesome](https://fontawesome.com/)

## 🎉 You're Ready!

Your Angular portfolio app is ready to go. Start by:
1. Running `npm start`
2. Updating API URLs in environments
3. Connecting to backend
4. Adding your data
5. Deploying to production

---

**Last Updated**: January 2024  
**Angular Version**: 18.0.0
