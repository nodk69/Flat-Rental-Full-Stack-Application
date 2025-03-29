package com.example.project.services.interfaces;

import com.example.project.entities.Notification;

import java.util.List;

public interface NotificationService {
    void createNotification(String message, Long userId);
    List<Notification> getAllNotifications(String email);
    List<Notification> getUnreadNotifications(String email);
    void markNotificationAsRead(Long notificationId);
    void markAllNotificationsAsRead(String email);
    void deleteNotification(Long notificationId);
    void deleteAllNotifications(String email);
}
