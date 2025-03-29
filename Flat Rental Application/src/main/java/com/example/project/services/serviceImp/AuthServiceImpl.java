package com.example.project.services.serviceImp;

import com.example.project.DTO.AuthRequest;
import com.example.project.DTO.AuthResponse;
import com.example.project.DTO.UserDTO;
import com.example.project.entities.User;
import com.example.project.entities.enums.Role;
import com.example.project.repositories.UserRepository;
import com.example.project.services.interfaces.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse("Email already exists", null);
        }

        if (request.getRole() == null) {
            return new AuthResponse("Role is required", null);
        }

        Role role;
        try {
            role = Role.valueOf(request.getRole().name());
        } catch (IllegalArgumentException e) {
            return new AuthResponse("Invalid role: " + request.getRole(), null);
        }

        // Prevent users from self-registering as ADMIN
//        if (role == Role.ADMIN) {
////            return new AuthResponse("You cannot register as ADMIN.", null);
//        }

        // Create and save new user with encoded password
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encode password
        user.setRole(role); // Corrected role assignment

        User saved = userRepository.save(user);
        return new AuthResponse("User registered successfully", saved.getRole());
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        try {
            //Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            //Fetch authenticated user
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            //Store role and permissions in SecurityContext
            UsernamePasswordAuthenticationToken authWithRoles =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(), //Principal
                            user.getPassword(), //Credentials
                            user.getAuthorities() //now including both role and permissions

                    );

            //Here storing authentication in SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authWithRoles);

            return new AuthResponse("Login successful as " + user.getRole().name(), user.getRole());
        } catch (Exception e) {
            return new AuthResponse("Invalid credentials", null);
        }
    }



    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {

        //Clear Spring Security Context
        SecurityContextHolder.clearContext();

        //Invalidate session
        HttpSession session = request.getSession(false); // Get the current session, if exists
        if (session != null) {
            session.invalidate();
        }

        //Remove JSESSIONID cookie
        response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0");

        //Ensure CORS allows credentials to be sent (important for frontend logout requests)
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    public boolean isAuthenticated(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null && session.getAttribute("user") != null;
    }

    @Override
    public String setUserRole(String email, String roleName, HttpSession session) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role;
        try {
            role = Role.valueOf(roleName.toUpperCase()); //Convert to uppercase for safety
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role provided.");
        }

        user.setRole(role);
        userRepository.save(user);

        session.setAttribute("role", role);
        session.setAttribute("user", email);

        return "Role assigned successfully.";
    }

    @Override
    public ResponseEntity<String> setUserRole(Map<String, String> requestBody, HttpSession session) {
        return null;
    }

    @Override
    public UserDTO getUserByEmail(String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isEmpty()){
            return null;
        }

        User user = optionalUser.get();

        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getProfilePicture()
        );
    }
}
