package com.norman.portfolio.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
public class PhoneNotificationService {

    private final boolean enabled;
    private final String ownerPhoneNumber;
    private final String twilioAccountSid;
    private final String twilioAuthToken;
    private final String twilioFromNumber;
    private final RestClient restClient;

    public PhoneNotificationService(
        @Value("${app.chat.phone-notifications-enabled:false}") boolean enabled,
        @Value("${app.chat.owner-phone-number:}") String ownerPhoneNumber,
        @Value("${app.chat.twilio-account-sid:}") String twilioAccountSid,
        @Value("${app.chat.twilio-auth-token:}") String twilioAuthToken,
        @Value("${app.chat.twilio-from-number:}") String twilioFromNumber
    ) {
        this.enabled = enabled;
        this.ownerPhoneNumber = ownerPhoneNumber;
        this.twilioAccountSid = twilioAccountSid;
        this.twilioAuthToken = twilioAuthToken;
        this.twilioFromNumber = twilioFromNumber;
        this.restClient = RestClient.builder().build();
    }

    public boolean sendVisitorMessage(String visitorName, String visitorContact, String message) {
        if (!enabled || isBlank(ownerPhoneNumber) || isBlank(twilioAccountSid) || isBlank(twilioAuthToken) || isBlank(twilioFromNumber)) {
            return false;
        }

        String smsBody = buildSmsBody(visitorName, visitorContact, message);
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("To", ownerPhoneNumber);
        form.add("From", twilioFromNumber);
        form.add("Body", smsBody);

        restClient.post()
            .uri("https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json", Map.of("sid", twilioAccountSid))
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .headers(headers -> headers.setBasicAuth(twilioAccountSid, twilioAuthToken))
            .body(form)
            .retrieve()
            .toBodilessEntity();

        return true;
    }

    private String buildSmsBody(String visitorName, String visitorContact, String message) {
        String name = isBlank(visitorName) ? "Unknown visitor" : visitorName;
        String contact = isBlank(visitorContact) ? "No contact provided" : visitorContact;
        return "Portfolio chat from " + name + " (" + contact + "): " + message;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
