package com.example.project.DTO;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class OwnerDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
}

