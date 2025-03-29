package com.example.project.services.interfaces;

import com.example.project.DTO.AdminDTO;
import com.example.project.DTO.BookingDTO;
import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    public AdminDTO adminRegister(AdminDTO adminDTO);

    Object findAdminById(Long id);

    List<Object> getAllUsers();

    List<FlatDTO> getAllFlats();

    void deleteUser(Long userId);

    void disableFlat(Long flatId);

    List<BookingDTO> getAllBookings();

    String generateReport();

    Optional<Admin> findByEmail(String email);
}
