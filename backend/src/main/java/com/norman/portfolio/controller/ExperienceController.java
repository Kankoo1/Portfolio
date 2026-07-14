package com.norman.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.norman.portfolio.api.ApiResponse;

@RestController
public class ExperienceController {

    @GetMapping("/experience")
    public ApiResponse<List<ExperienceDto>> getExperience() {
        List<ExperienceDto> data = List.of(
            new ExperienceDto(
                "Software Engineer II",
                "Bank of America",
                "Charlotte, NC",
                "2023-02-01",
                null,
                "Designed and developed scalable Spring Boot microservices and RESTful APIs supporting high-volume enterprise data processing and integration across AWS and VMware Tanzu environments.",
                List.of(
                    "Designed and developed scalable Spring Boot microservices and RESTful APIs for enterprise data processing and integration.",
                    "Integrated REST and SOAP services with PostgreSQL, MySQL, MongoDB, Oracle, and DB2 using Spring Data JPA and Hibernate.",
                    "Automated build, test, and deployment workflows using Jenkins and deployed containerized applications to OpenShift.",
                    "Improved quality and security via SonarQube remediation and production support with Splunk, Dynatrace, and AppDynamics.",
                    "Implemented event-driven integrations using Apache Kafka and IBM MQ for reliable asynchronous data exchange."
                ),
                List.of("Java", "Spring Boot", "REST", "SOAP", "Kafka", "MySQL", "MongoDB", "JPA", "Hibernate", "Jenkins", "OpenShift", "Docker", "Kubernetes", "AWS", "SonarQube", "Splunk")
            ),
            new ExperienceDto(
                "Associate Software Engineer",
                "Revature LLC.",
                "Reston, VA",
                "2022-11-01",
                "2023-02-01",
                "Developed Spring Boot RESTful microservices and SOAP-based integrations while assisting with CI/CD automation and database optimization.",
                List.of(
                    "Developed Spring Boot RESTful microservices and SOAP-based integrations.",
                    "Assisted with CI/CD automation using Jenkins and Docker.",
                    "Built database-driven features and optimized SQL queries for Oracle and Sybase systems."
                ),
                List.of("Spring Boot", "REST", "SOAP", "Jenkins", "Docker", "Oracle", "Sybase", "Postman", "Soap UI")
            ),
            new ExperienceDto(
                "Full Stack Java Developer Trainee",
                "Generation USA",
                "Remote",
                "2022-03-01",
                "2022-09-01",
                "Built full-stack applications using Spring Boot REST APIs and Angular front-end components during hands-on training.",
                List.of(
                    "Built full-stack applications using Spring Boot REST APIs and Angular front-end components.",
                    "Implemented authentication and authorization using Spring Security.",
                    "Practiced unit and UI testing with JUnit, Jasmine, and Karma following Agile principles."
                ),
                List.of("Java", "Spring Boot", "Angular", "Spring Security", "JUnit", "Jasmine", "Karma", "Bootstrap", "SQL")
            ),
            new ExperienceDto(
                "Instructor (Full-Time), Environmental Science",
                "Adigrat University",
                "Ethiopia",
                "2016-09-01",
                "2019-06-01",
                "Taught Environmental Informatics and Environmental Science courses, integrating software tools and programming concepts to analyze and interpret environmental data.",
                List.of(
                    "Taught Environmental Informatics and Environmental Science courses.",
                    "Delivered lectures and hands-on labs on data analysis, databases, and applied computing.",
                    "Guided students in statistical and analytical software for environmental datasets.",
                    "Supervised data-focused student projects and translated technical concepts for diverse audiences."
                ),
                List.of("Environmental Science", "Environmental Informatics", "Data Analysis", "Databases", "Statistics")
            ),
            new ExperienceDto(
                "Mining & Energy Environmental Analyst",
                "Bati Town",
                "Ethiopia",
                "2015-09-01",
                "2016-09-01",
                "Conducted environmental impact assessments and statistical analysis for mining and energy projects.",
                List.of(
                    "Conducted environmental impact assessments for mining and energy projects.",
                    "Performed statistical analysis of environmental datasets using R and SPSS.",
                    "Prepared technical and non-technical reports with actionable recommendations.",
                    "Collaborated with geologists, engineers, and regulators to support evidence-based decisions."
                ),
                List.of("Environmental Impact Assessment", "R", "SPSS", "Data Analysis", "Reporting")
            )
        );

        return ApiResponse.ok(data);
    }

    public record ExperienceDto(
        String title,
        String company,
        String location,
        String startDate,
        String endDate,
        String description,
        List<String> responsibilities,
        List<String> skills
    ) {}
}
