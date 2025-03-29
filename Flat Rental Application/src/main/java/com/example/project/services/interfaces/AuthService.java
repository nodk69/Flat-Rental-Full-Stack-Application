package com.example.project.services.interfaces;

import com.example.project.DTO.AuthRequest;
import com.example.project.DTO.AuthResponse;
import com.example.project.DTO.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

public interface AuthService {
    AuthResponse register(AuthRequest request);
    AuthResponse login(AuthRequest request);

    void logout(HttpServletRequest request, HttpServletResponse response);

    boolean isAuthenticated(HttpServletRequest request);

    String setUserRole(String email, String roleName, HttpSession session);
    ResponseEntity<String> setUserRole(@RequestBody Map<String, String> requestBody, HttpSession session);

    UserDTO getUserByEmail(String email);
}
