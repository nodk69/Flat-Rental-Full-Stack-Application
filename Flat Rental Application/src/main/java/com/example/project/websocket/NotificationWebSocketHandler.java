package com.example.project.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    //Store user sessions mapped by username (for OAuth2 & session-based login)
    private final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Principal principal = session.getPrincipal();
        if (principal != null) {
            userSessions.put(principal.getName(), session);
            log.info("User {} connected to WebSocket", principal.getName());
        } else {
            log.warn("WebSocket connection without authenticated user.");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        userSessions.values().remove(session);
        log.info("WebSocket Connection Closed.");
    }

    //Send notification only to a specific authenticated user
    public void sendNotificationToUser(String email, String message) {
        WebSocketSession session = userSessions.get(email);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
                log.info("Sent WebSocket notification to User {}: {}", email, message);
            } catch (IOException e) {
                log.error("Error sending WebSocket message to User {}: {}", email, e.getMessage());
            }
        }
    }

    public void registerUserSession(String email, WebSocketSession session) {
        userSessions.put(email, session);
    }

    public void removeUserSession(String email) {
        userSessions.remove(email);
    }
}
