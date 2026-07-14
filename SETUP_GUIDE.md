# Portfolio Application Configuration Guide

## 🚀 Quick Start Guide

### 1. Prerequisites
- Java 21+
- Docker & Docker Compose
- Git

### 2. Setup Instructions

#### Option A: Using Docker Compose (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd Portfolio/backend

# Create environment file
cp .env.template .env

# Edit .env with your desired passwords
nano .env  # or use your preferred editor

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f app
```

#### Option B: Local Development
```bash
# Start database only
docker-compose up -d mysql

# Build backend
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

### 3. Verify Installation
- Frontend: http://localhost:8080
- Health Check: http://localhost:8080/api/actuator/health
- Metrics: http://localhost:8080/api/actuator/metrics

### 4. Troubleshooting

**Database Connection Failed**
- Ensure MySQL is running: `docker-compose ps`
- Check environment variables in `.env`
- View database logs: `docker-compose logs mysql`

**Application Won't Start**
- Verify Java 21 is installed: `java -version`
- Check database connection string in `application.properties`
- Review application logs: `docker-compose logs app`

**Port Already in Use**
- Change port in `application.properties` (default: 8080)
- Or kill existing process: `lsof -i :8080` (macOS/Linux)

## 📊 Project Structure

```
Portfolio/
├── backend/           # Spring Boot application
│   ├── src/          # Source code
│   ├── pom.xml       # Maven configuration
│   ├── Dockerfile    # Docker image definition
│   └── compose.yaml  # Docker Compose for development
├── content/          # Static message page content
├── css/              # Stylesheets
├── images/           # Image assets
├── js/               # JavaScript files
├── index.html        # Main portfolio page
└── README.md         # Documentation
```

## 🔐 Security Notes

1. **Never commit `.env` files** - Use `.env.template` instead
2. **Change default passwords** - Update before deploying to production
3. **Use environment variables** for sensitive data
4. **Restrict database user permissions** - Portfolio user should not have admin rights
5. **Enable HTTPS** - Use reverse proxy (nginx/Apache) in production

## 📈 Performance Tips

1. **Database Indexing** - Configure indexes on frequently queried columns
2. **Connection Pooling** - Hibernate uses C3P0 by default
3. **Caching** - Consider adding Redis for session/data caching
4. **Load Balancing** - Use multiple instances behind a load balancer

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Bootstrap Framework](https://getbootstrap.com/)
- [MySQL Performance Tuning](https://dev.mysql.com/doc/)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Spring Boot logs
3. Consult Docker documentation
4. Open an issue in the repository

---

**Last Updated:** January 2024
**Version:** 1.0.0
**Maintained By:** Hussein Nour
