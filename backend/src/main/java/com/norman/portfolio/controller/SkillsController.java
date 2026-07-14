package com.norman.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.norman.portfolio.api.ApiResponse;

@RestController
public class SkillsController {

    @GetMapping("/skills")
    public ApiResponse<List<SkillDto>> getSkills() {
        List<SkillDto> data = List.of(
            new SkillDto("Java", "Languages & Scripting", 95, 12),
            new SkillDto("Python", "Languages & Scripting", 85, 8),
            new SkillDto("SQL", "Languages & Scripting", 90, 10),
            new SkillDto("JavaScript", "Languages & Scripting", 85, 7),
            new SkillDto("TypeScript", "Languages & Scripting", 80, 6),
            new SkillDto("Spring Boot", "Backend & APIs", 95, 11),
            new SkillDto("Spring MVC", "Backend & APIs", 90, 9),
            new SkillDto("Spring Security", "Backend & APIs", 88, 8),
            new SkillDto("REST", "Backend & APIs", 95, 12),
            new SkillDto("SOAP", "Backend & APIs", 85, 7),
            new SkillDto("Microservices", "Backend & APIs", 90, 8),
            new SkillDto("PostgreSQL", "Data & ETL", 88, 8),
            new SkillDto("MySQL", "Data & ETL", 86, 7),
            new SkillDto("Oracle", "Data & ETL", 82, 6),
            new SkillDto("DB2", "Data & ETL", 78, 5),
            new SkillDto("MongoDB", "Data & ETL", 80, 6),
            new SkillDto("JPA", "Data & ETL", 84, 7),
            new SkillDto("Hibernate", "Data & ETL", 84, 7),
            new SkillDto("ETL concepts", "Data & ETL", 82, 6),
            new SkillDto("AWS", "Cloud & DevOps", 85, 8),
            new SkillDto("Azure", "Cloud & DevOps", 80, 7),
            new SkillDto("OpenShift", "Cloud & DevOps", 82, 6),
            new SkillDto("Docker", "Cloud & DevOps", 88, 8),
            new SkillDto("Kubernetes", "Cloud & DevOps", 78, 5),
            new SkillDto("Jenkins", "Cloud & DevOps", 84, 7),
            new SkillDto("Git", "Cloud & DevOps", 92, 9),
            new SkillDto("Splunk", "Monitoring & Ops", 80, 6),
            new SkillDto("Dynatrace", "Monitoring & Ops", 78, 5),
            new SkillDto("AppDynamics", "Monitoring & Ops", 76, 5),
            new SkillDto("Angular", "Frontend", 85, 7),
            new SkillDto("HTML", "Frontend", 90, 9),
            new SkillDto("CSS", "Frontend", 88, 8),
            new SkillDto("R", "Scientific & Analytics Tools", 80, 6),
            new SkillDto("SPSS", "Scientific & Analytics Tools", 78, 5),
            new SkillDto("Statistical Analysis", "Scientific & Analytics Tools", 85, 7),
            new SkillDto("Linux / Unix", "Operating Systems", 88, 8)
        );

        return ApiResponse.ok(data);
    }

    public record SkillDto(String name, String category, int proficiency, Integer endorsements) {}
}
