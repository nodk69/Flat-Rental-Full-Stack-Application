package com.example.project.controllers;

import com.example.project.DTO.AuthRequest;
import com.example.project.DTO.AuthResponse;
import com.example.project.DTO.UserDTO;
import com.example.project.entities.enums.Role;
import com.example.project.repositories.UserRepository;
import com.example.project.services.serviceImp.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthServiceImpl authServiceImpl;

    @Autowired
    private UserRepository userRepository;




    // [Public] – Register any user (Tenant, Owner)
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authServiceImpl.register(request));
    }

//    @Override
//    public AuthResponse login(AuthRequest request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//        );
//
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return new AuthResponse("Login successful.", user.getRole().toString());
//    }

    // [Public] – Login for any user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletRequest httpRequest, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authServiceImpl.login(request);

            if (authResponse.getRole() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("authenticated", false, "error", "Invalid credentials"));
            }

            //Create session only if authentication is successful
            HttpSession session = httpRequest.getSession(true);

            //Store authentication in SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                authentication = new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        null,
                        authResponse.getRole().getAuthorities() //Store both role & permissions
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            //Store user details inside session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext()); //Critical for session persistence
            session.setAttribute("user", request.getEmail());
            session.setAttribute("role", authResponse.getRole());

            //Set HttpOnly session cookie
            response.setHeader("Set-Cookie", "JSESSIONID=" + session.getId() + "; HttpOnly; Path=/; SameSite=Strict");

            return ResponseEntity.ok(Map.of(
                    "authenticated", true,
                    "role", authResponse.getRole()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false, "error", "Invalid credentials"));
        }
    }




    //Check if User is Authenticated
    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        String email = (String) session.getAttribute("user");
        Role roleEnum = (Role) session.getAttribute("role");
        String role = (roleEnum!=null)? roleEnum.name():null;
         //Retrieve stored role

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "role", role //Include role in response
        ));
    }



    //Assign Role to User
    @PostMapping("/set-role")
    public ResponseEntity<String> setUserRole(@RequestBody Map<String, String> requestBody, HttpSession session) {
        String email = requestBody.get("email");
        String roleName = requestBody.get("role");

        return ResponseEntity.ok(authServiceImpl.setUserRole(email, roleName, session));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getLoggedInUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDTO userDTO = authServiceImpl.getUserByEmail(authentication.getName());
        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(userDTO);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){
        authServiceImpl.logout(request,response);
        return ResponseEntity.ok(Map.of("message","Logged out successfully"));

    }


}
