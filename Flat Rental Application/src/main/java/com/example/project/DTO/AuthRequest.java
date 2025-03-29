package com.example.project.DTO;

import com.example.project.entities.enums.Role;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
    public Role role;
}
