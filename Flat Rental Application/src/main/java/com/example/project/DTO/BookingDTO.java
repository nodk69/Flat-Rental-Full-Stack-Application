package com.example.project.DTO;

import com.example.project.entities.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class BookingDTO {
    private Long id;
    private Long tenantId;
    private Long flatId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus status;

}
