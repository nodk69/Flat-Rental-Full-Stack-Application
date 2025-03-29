package com.example.project.config;

import com.example.project.entities.User;
import com.example.project.entities.enums.Role;
import com.example.project.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        HttpSession session = request.getSession(true);
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");

        // Fetch user role directly from `users` table
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            Role userRole = existingUser.get().getRole();
            session.setAttribute("user", email);
            session.setAttribute("role", userRole);

            // Set authentication in the Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            // Redirect to the correct dashboard
            String redirectUrl = switch (userRole) {
                case OWNER -> "http://localhost:5173/owner/dashboard";
                case ADMIN -> "http://localhost:5173/admin/dashboard";
                default -> "http://localhost:5173/";
            };

            response.sendRedirect(redirectUrl);
        } else {
            // New user needs to select a role
            response.sendRedirect("http://localhost:5173/role-selection?email=" + email);
        }
    }
}
