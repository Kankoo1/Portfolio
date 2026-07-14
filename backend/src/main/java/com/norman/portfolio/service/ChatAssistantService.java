package com.norman.portfolio.service;

import java.util.Locale;

import org.springframework.stereotype.Service;

@Service
public class ChatAssistantService {

    public String buildReply(String message, String visitorName, String visitorContact) {
        String normalized = message == null ? "" : message.toLowerCase(Locale.ENGLISH);

        if (containsAny(normalized, "hi", "hello", "hey", "good morning", "good afternoon", "good evening")) {
            return "Hello. I can help with Nuru's skills, experience, education, and availability. You can also leave your phone or email if you want a follow-up.";
        }

        if (containsAny(normalized, "skill", "stack", "technology", "tech")) {
            return "Nuru works mainly with Java, Spring Boot, REST APIs, Angular, SQL, Docker, OpenShift, AWS, and data-heavy backend integrations.";
        }

        if (containsAny(normalized, "experience", "work", "career", "bank of america", "revature")) {
            return "Nuru has enterprise backend and integration experience across Bank of America, Revature, and Generation USA, with strong Spring Boot, microservices, CI/CD, and cloud platform work.";
        }

        if (containsAny(normalized, "education", "msc", "bsc", "university")) {
            return "Nuru studied Environmental Science at Haramaya University, with a BSc from Sep 2012 to Jul 2015 and an MSc from Sep 2017 to Jul 2019.";
        }

        if (containsAny(normalized, "hire", "available", "contact", "call", "phone", "email")) {
            String followUp = (visitorContact != null && !visitorContact.isBlank())
                ? " I also captured your contact for follow-up."
                : " Share your phone or email in the chat if you want direct follow-up.";
            return "You can reach Nuru at husseinnour469@gmail.com, and he is open to conversations about backend engineering, full-stack roles, and integration work." + followUp;
        }

        return "I can help with Nuru's skills, experience, education, and availability. Try asking something like: what backend technologies does he use, where has he worked, or how can I contact him?";
    }

    private boolean containsAny(String text, String... tokens) {
        for (String token : tokens) {
            if (text.contains(token)) {
                return true;
            }
        }
        return false;
    }
}
