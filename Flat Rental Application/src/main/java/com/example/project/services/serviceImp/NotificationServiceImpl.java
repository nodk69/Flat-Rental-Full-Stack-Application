package com.example.project.services.serviceImp;

import com.example.project.entities.Notification;
import com.example.project.entities.User;
import com.example.project.repositories.NotificationRepository;
import com.example.project.repositories.UserRepository;
import com.example.project.services.interfaces.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public void createNotification(String message, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .isRead(false)
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Override
    public List<Notification> getUnreadNotifications(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);
    }

    @Override
    @Transactional
    public void markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void markAllNotificationsAsRead(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        notificationRepository.markAllAsReadByUser(user);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    @Override
    @Transactional
    public void deleteAllNotifications(String email) {
        Optional<User>  user = userRepository.findByEmail(email);
        notificationRepository.deleteByUser(user);
    }
}
