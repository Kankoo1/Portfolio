# Professional Portfolio Application

A modern, full-stack portfolio application built with Spring Boot 3.5.5 and Bootstrap 5. This application showcases your professional profile, education, skills, and experience in an elegant and responsive design.

## 🎯 Features

- **Modern Frontend**: Bootstrap 5.3.3 with Font Awesome 6.4.0
- **Robust Backend**: Spring Boot 3.5.5 with Spring Security
- **Database**: MySQL 8.0 with JPA/Hibernate ORM
- **Containerization**: Docker & Docker Compose support
- **Security**: Spring Security configuration, environment-based secrets
- **Health Monitoring**: Spring Boot Actuator for application metrics
- **Responsive Design**: Mobile-first approach using Bootstrap
- **Professional UI**: Modern card-based layout with smooth navigation

## 🛠️ Technology Stack

### Backend
- **Java**: 21
- **Framework**: Spring Boot 3.5.5
- **Spring Modules**: 
  - Spring Web (REST APIs)
  - Spring Security (Authentication & Authorization)
  - Spring Data JPA (Database ORM)
  - Spring Actuator (Health Checks & Metrics)
  - Spring DevTools (Development)
- **Database**: MySQL 8.0
- **Build Tool**: Maven

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive styling
- **Bootstrap**: 5.3.3 framework
- **Font Awesome**: 6.4.0 icons
- **JavaScript**: Modern ES6+

### DevOps
- **Docker**: Multi-stage build for optimized images
- **Docker Compose**: Local development orchestration
- **Alpine Linux**: Lightweight base images

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.6.0 or higher
- Docker & Docker Compose (optional, for containerized deployment)
- MySQL 8.0 (or use Docker Compose)

## 🚀 Getting Started

### Netlify Deployment

This repository is split into two parts:

1. Angular frontend: can be deployed to Netlify.
2. Spring Boot backend: cannot run on Netlify and must be deployed separately to a Java-friendly host such as Render, Railway, Azure App Service, or another VM/container platform.

Netlify is configured via [netlify.toml](netlify.toml) at the repository root.

Frontend deploy steps:

```text
1. Push this repository to GitHub.
2. In Netlify, create a new site from Git.
3. Select the repository.
4. Netlify will use:
   Base directory: angular
   Build command: npm run build
   Publish directory: dist/portfolio-ui
```

Important:

- The Angular app uses fallback data if the backend is unavailable, so the frontend can still render on Netlify.
- If you later deploy the Spring Boot backend, update [angular/src/environments/environment.prod.ts](angular/src/environments/environment.prod.ts) with the real backend URL before rebuilding.

### One-Command Local Dev (Windows)

From the repository root, start backend + Angular together:

```powershell
.\start-dev.ps1
```

Optional: create a root-level `.env.dev.local` file first if you want the launcher to load Twilio or other local secrets automatically:

```text
OWNER_PHONE_NUMBER=+13017558788
CHAT_PHONE_NOTIFICATIONS_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1xxxxxxxxxx
```

Stop both services:

```powershell
.\stop-dev.ps1
```

Endpoints:
- Angular: http://localhost:4200
- Spring Boot API: http://localhost:8080/api

### Local Development

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Start MySQL Database** (using Docker Compose)
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Configure Environment Variables**
   ```bash
   # Create a .env file in the backend directory
   DB_PASSWORD=your_secure_password
   MYSQL_ROOT_PASSWORD=your_root_password
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Build and Run Backend**
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

5. **Access the Application**
   - Frontend: http://localhost:8080
   - API Documentation: http://localhost:8080/api/actuator
   - Health Check: http://localhost:8080/api/actuator/health

### Docker Deployment

1. **Build Docker Image**
   ```bash
   cd backend
   docker build -t portfolio:latest .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/norman/portfolio/
│   │   │   │   └── PortfolioApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── compose.yaml
│   ├── mvnw
│   └── mvnw.cmd
├── content/
│   ├── message.html
│   ├── message.js
│   └── style.css
├── css/
│   ├── style.css
│   └── message.css
├── images/
│   ├── logo-modified.png
│   ├── gmail.jpeg
│   ├── Facebook_Logo.png
│   ├── twitter.png
│   └── linkedIn.png
├── js/
│   └── form-validation.js
├── index.html
└── README.md
```

## 🔐 Security Features

- **Spring Security**: Enabled with default admin credentials (configurable via environment)
- **Environment-based Configuration**: Sensitive data loaded from environment variables
- **Docker Security**: Non-root user for container execution
- **HTTPS Ready**: Application can be deployed behind reverse proxy (nginx, Apache)
- **SQL Injection Prevention**: Using prepared statements via JPA

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/actuator/health` | Application health status |
| GET | `/api/actuator/metrics` | Application metrics |
| GET | `/api/actuator/info` | Application information |

## 🧪 Testing

```bash
cd backend
./mvnw test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_PASSWORD` | MySQL database password | `portfolio_secure_pass` |
| `MYSQL_ROOT_PASSWORD` | MySQL root password | `root_secure_pass` |
| `ADMIN_PASSWORD` | Spring Security admin password | `admin123` |
| `OWNER_PHONE_NUMBER` | Destination phone number for chat notifications in E.164 format | none |
| `CHAT_PHONE_NOTIFICATIONS_ENABLED` | Enable SMS notifications for chat leads | `false` |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | none |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | none |
| `TWILIO_FROM_NUMBER` | Twilio SMS-enabled sender number in E.164 format | none |

## 🔄 Continuous Integration/Deployment

Create `.github/workflows/ci-cd.yml` for automated testing and deployment:

```yaml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '21'
          distribution: 'temurin'
      - run: cd backend && ./mvnw clean test package
```

## 🎨 Customization

### Update Profile Information
Edit `index.html` sections:
- Profile section: Your name, title, description
- Education section: Your educational background
- Skills section: Your technical skills
- Experience section: Your professional experience

### Customize Styling
- **Global styles**: `css/style.css`
- **Message page styles**: `css/message.css` or `content/style.css`
- **Bootstrap variables**: Override in CSS or use Bootstrap utilities

### Configure Backend
Edit `backend/src/main/resources/application.properties`:
- Database connection
- Logging levels
- Actuator endpoints
- Server port and context path

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if MySQL is running
docker-compose ps

# View database logs
docker-compose logs mysql

# Access MySQL directly
docker-compose exec mysql mysql -u root -p
```

### Application Won't Start
```bash
# Check Java version
java -version

# Check Maven installation
mvn -version

# Check dependency resolution
./mvnw dependency:tree
```

### Port Already in Use
```bash
# Change port in application.properties
server.port=8081

# Or kill the process using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows
```

## 📚 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 🤝 Contributing

1. Create a new branch for your feature: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Hussein Nour**
- Email: husseinnour469@gmail.com
- LinkedIn: [Hussein Nour](https://www.linkedin.com/in/hussein-nour)
- Facebook: [Hussein Nour](https://www.facebook.com/profile.php?id=100079614612943)

## 🎯 Roadmap

- [ ] REST API for portfolio data
- [ ] Admin dashboard for content management
- [ ] Blog section integration
- [ ] Project portfolio showcase
- [ ] Contact form with email integration
- [ ] Search functionality
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Analytics integration

## ⭐ Support

If you found this helpful, please consider giving it a star! ⭐

---

Last Updated: 2024

