package com.example.project.controllers;

import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Notification;
import com.example.project.entities.User;
import com.example.project.services.interfaces.FlatService;
import com.example.project.services.interfaces.NotificationService;
import com.example.project.services.interfaces.UserService;
import com.example.project.websocket.NotificationWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;
    private final FlatService flatService;
    private final NotificationWebSocketHandler notificationWebSocketHandler;

    // Get all notifications for authenticated user
    @GetMapping("/user")
    public List<Notification> getUserNotifications(Authentication authentication) {
        return notificationService.getAllNotifications(authentication.getName());
    }

    // Get only unread notifications
    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications(Authentication authentication) {
        return notificationService.getUnreadNotifications(authentication.getName());
    }

    // Mark a single notification as read
    @PatchMapping("/mark-as-read/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read");
    }

    // Mark all notifications as read
    @PostMapping("/mark-all-as-read")
    public ResponseEntity<String> markAllNotificationsAsRead(Authentication authentication) {
        notificationService.markAllNotificationsAsRead(authentication.getName());
        return ResponseEntity.ok("All notifications marked as read");
    }

    // Delete a specific notification
    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted successfully");
    }

    // Delete all notifications for the authenticated user
    @DeleteMapping("/delete-all")
    public ResponseEntity<String> deleteAllNotifications(Authentication authentication) {
        notificationService.deleteAllNotifications(authentication.getName());
        return ResponseEntity.ok("All notifications deleted successfully");
    }

    // Notify owner when a tenant views a flat
    @PostMapping("/{flatId}/view")
    public ResponseEntity<String> viewFlat(@PathVariable Long flatId, Authentication authentication) {
        Optional<User> tenant = userService.findByEmail(authentication.getName());
        FlatDTO flat = flatService.getFlatById(flatId);

        if (flat == null) {
            return ResponseEntity.badRequest().body("Flat not found");
        }

        Long ownerId = flat.getOwnerId();
        if (ownerId == null) {
            return ResponseEntity.badRequest().body("Flat has no owner");
        }

        String message = tenant.get().getEmail() + " viewed your property: " + flat.getId();
        notificationService.createNotification(message, ownerId);

        // Send real-time notification via WebSocket
        notificationWebSocketHandler.sendNotificationToUser(userService.getUserById(ownerId), message);

        return ResponseEntity.ok("Flat viewed successfully");
    }

    // Notify owner when a tenant saves a property
    @PostMapping("/{flatId}/save")
    public ResponseEntity<String> saveFlat(@PathVariable Long flatId, Authentication authentication) {
        Optional<User> tenant = userService.findByEmail(authentication.getName());
        FlatDTO flat = flatService.getFlatById(flatId);

        if (flat == null || tenant.isEmpty()) {
            return ResponseEntity.badRequest().body("Flat not found or tenant not authenticated");
        }

        Long ownerId = flat.getOwnerId();
        if (ownerId == null) {
            return ResponseEntity.badRequest().body("Flat has no owner");
        }

        String message = tenant.get().getEmail() + " saved your property to their wishlist.";
        notificationService.createNotification(message, ownerId);
        notificationWebSocketHandler.sendNotificationToUser(userService.getUserById(ownerId), message);

        return ResponseEntity.ok("Owner notified about property save");
    }
}
