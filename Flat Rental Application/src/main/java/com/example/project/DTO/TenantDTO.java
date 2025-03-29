package com.example.project.DTO;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class TenantDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
}

