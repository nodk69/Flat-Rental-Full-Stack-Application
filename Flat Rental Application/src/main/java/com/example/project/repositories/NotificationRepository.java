package com.example.project.repositories;

import com.example.project.entities.Notification;
import com.example.project.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(Optional<User> user);
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(Optional<User> user);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.user = :user")
    void markAllAsReadByUser(Optional<User> user);

    void deleteByUser(Optional<User> user);
}
