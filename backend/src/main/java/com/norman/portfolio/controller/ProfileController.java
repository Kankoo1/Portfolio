package com.norman.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.norman.portfolio.api.ApiResponse;

@RestController
public class ProfileController {

    @GetMapping("/profile")
    public ApiResponse<ProfileDto> getProfile() {
        ProfileDto data = new ProfileDto(
            "Nuru Hussein",
            "Full Stack Developer | Java | Spring Boot | Web Technologies",
            "Passionate about creating elegant solutions to complex problems. Specialized in backend development with modern Java frameworks and cloud-native architecture.",
            "husseinnour469@gmail.com",
            "",
            "assets/images/myphoto.png",
            List.of(
                new SocialLinkDto("LinkedIn", "https://www.linkedin.com/in/nuru-hussein/"),
                new SocialLinkDto("GitHub", "https://github.com/Kankoo1"),
                new SocialLinkDto("Facebook", "https://www.facebook.com/nuru.hussein.964417"),
                new SocialLinkDto("Twitter", "https://twitter.com")
            )
        );

        return ApiResponse.ok(data);
    }

    public record SocialLinkDto(String platform, String url) {}

    public record ProfileDto(
        String name,
        String title,
        String bio,
        String email,
        String phone,
        String profileImage,
        List<SocialLinkDto> socialLinks
    ) {}
}
