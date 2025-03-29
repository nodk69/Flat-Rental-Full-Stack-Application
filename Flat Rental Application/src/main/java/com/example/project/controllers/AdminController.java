package com.example.project.controllers;

import com.example.project.DTO.AdminDTO;
import com.example.project.DTO.BookingDTO;
import com.example.project.DTO.FlatDTO;
import com.example.project.services.serviceImp.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    // Allow registration for ADMIN without role restriction
    @PostMapping("/register")
    //@PreAuthorize("permitAll()")
    public ResponseEntity<AdminDTO> registerAdmin(@RequestBody AdminDTO adminDTO) {
        System.out.println("email: " + adminDTO.getEmail());
        System.out.println("password: " + adminDTO.getPassword());
        return ResponseEntity.ok(adminService.adminRegister(adminDTO));
    }

    // Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.findAdminById(id));
    }

    // Get all users (tenants and owners)
    @GetMapping("/users")
    public ResponseEntity<List<Object>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // Get all flats
    @GetMapping("/flats")
    public ResponseEntity<List<FlatDTO>> getAllFlats() {
        return ResponseEntity.ok(adminService.getAllFlats());
    }

    // Delete a user (tenant or owner)
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    // Disable a flat (e.g., hide from public listings)
    @PutMapping("/flats/{flatId}/disable")
    public ResponseEntity<String> disableFlat(@PathVariable Long flatId) {
        adminService.disableFlat(flatId);
        return ResponseEntity.ok("Flat disabled successfully.");
    }

    // Get all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }

    // Generate basic reports/stats
    @GetMapping("/reports")
    public ResponseEntity<String> generateReportsOrStats() {
        String report = adminService.generateReport();
        return ResponseEntity.ok(report);
    }
}
