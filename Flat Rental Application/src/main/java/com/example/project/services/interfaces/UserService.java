package com.example.project.services.interfaces;

import com.example.project.entities.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByEmail(String email);

    Optional<User> findByEmail(String name);

    String getUserById(Long ownerId);
}
