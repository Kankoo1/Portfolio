package com.norman.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.norman.portfolio.api.ApiResponse;

@RestController
public class EducationController {

    @GetMapping("/education")
    public ApiResponse<List<EducationDto>> getEducation() {
        List<EducationDto> data = List.of(
            new EducationDto(
                "Haramaya University",
                "MSc",
                "Environmental Science",
                "2017-09-01",
                "2019-07-31",
                "Completed advanced studies in environmental science with a focus on research, sustainability, and analytical methods.",
                null
            ),
            new EducationDto(
                "Haramaya University",
                "BSc",
                "Environmental Science",
                "2012-09-01",
                "2015-07-31",
                "Built a strong foundation in environmental systems, scientific analysis, and applied problem-solving.",
                null
            )
        );

        return ApiResponse.ok(data);
    }

    public record EducationDto(
        String institution,
        String degree,
        String field,
        String startDate,
        String endDate,
        String description,
        Double gpa
    ) {}
}
