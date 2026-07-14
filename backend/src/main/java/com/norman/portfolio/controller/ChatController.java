package com.norman.portfolio.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.norman.portfolio.api.ApiResponse;
import com.norman.portfolio.service.ChatAssistantService;
import com.norman.portfolio.service.PhoneNotificationService;

@RestController
public class ChatController {

    private final ChatAssistantService chatAssistantService;
    private final PhoneNotificationService phoneNotificationService;

    public ChatController(
        ChatAssistantService chatAssistantService,
        PhoneNotificationService phoneNotificationService
    ) {
        this.chatAssistantService = chatAssistantService;
        this.phoneNotificationService = phoneNotificationService;
    }

    @PostMapping("/chat")
    public ApiResponse<ChatReplyDto> chat(@RequestBody ChatRequestDto request) {
        String reply = chatAssistantService.buildReply(
            request.message(),
            request.visitorName(),
            request.visitorContact()
        );

        boolean notificationSent = false;
        if (request.visitorContact() != null && !request.visitorContact().isBlank()) {
            try {
                notificationSent = phoneNotificationService.sendVisitorMessage(
                    request.visitorName(),
                    request.visitorContact(),
                    request.message()
                );
            } catch (RuntimeException ex) {
                notificationSent = false;
            }
        }

        return ApiResponse.ok(new ChatReplyDto(reply, notificationSent));
    }

    public record ChatRequestDto(String message, String visitorName, String visitorContact) {}

    public record ChatReplyDto(String reply, boolean notificationSent) {}
}
