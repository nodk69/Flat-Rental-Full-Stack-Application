package com.example.project.services.serviceImp;

import com.example.project.DTO.AdminDTO;
import com.example.project.DTO.BookingDTO;
import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Admin;
import com.example.project.entities.Flat;
import com.example.project.entities.enums.FlatStatus;
import com.example.project.entities.enums.Role;
import com.example.project.repositories.AdminRepository;
import com.example.project.repositories.BookingRepository;
import com.example.project.repositories.FlatRepository;
import com.example.project.repositories.UserRepository;
import com.example.project.services.interfaces.AdminService;
import com.example.project.services.interfaces.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public AdminDTO adminRegister(AdminDTO adminDTO) {
        //Check if email is already registered
        Optional<Admin> existingAdmin = adminRepository.findByEmail(adminDTO.getEmail());
        if (existingAdmin.isPresent()) {
            throw new RuntimeException("Admin with this email already exists.");
        }

        // Create new Admin entity
        Admin admin = new Admin();
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(adminDTO.getPassword());
        admin.setRole(Role.ADMIN); // Ensure role assignment

        //Save Admin in database
        Admin savedAdmin = adminRepository.save(admin);

        return new AdminDTO(
                savedAdmin.getId(),
                savedAdmin.getEmail(),
                savedAdmin.getPassword(),
                savedAdmin.getRole()
        );
    }


    @Override
    public AdminDTO findAdminById(Long id) {

        return adminRepository.findById(id)
                .map(admin-> new AdminDTO(
                        admin.getId(),
                        admin.getEmail(),
                        admin.getPassword(),
                        admin.getRole()

                ))
                .orElseThrow(
                        ()->new RuntimeException("not found"));

    }

    @Override
    public List<Object> getAllUsers() {
        return List.of();
    }

    @Override
    public List<FlatDTO> getAllFlats() {
        return List.of();
    }

    @Override
    public void deleteUser(Long userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(userId);
    }


    @Override
    public void disableFlat(Long flatId) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new RuntimeException("Flat not found"));

        flat.setStatus(FlatStatus.UNDER_MAINTENANCE);
        flatRepository.save(flat);
    }


    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getTenant().getId(),
                        booking.getFlat().getId(),
                        booking.getStartDate(),
                        booking.getEndDate(),
                        booking.getStatus()
                ))
                .collect(Collectors.toList());
    }


    @Override
    public String generateReport() {
        long totalUsers = userRepository.count();
        long totalFlats = flatRepository.count();
        long totalBookings = bookingRepository.count();

        return String.format(
                "Total Users: %d\nTotal Flats: %d\nTotal Bookings: %d",
                totalUsers, totalFlats, totalBookings
        );
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

}
