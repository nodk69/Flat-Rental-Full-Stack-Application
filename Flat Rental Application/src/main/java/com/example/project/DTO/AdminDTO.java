package com.example.project.DTO;

import com.example.project.entities.enums.Role;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminDTO {

    private Long id;
    private String email;
    private String password;
    private Role role;

}
