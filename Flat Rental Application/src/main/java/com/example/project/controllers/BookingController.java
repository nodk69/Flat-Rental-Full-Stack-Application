package com.example.project.controllers;

import com.example.project.DTO.BookingDTO;
import com.example.project.entities.enums.BookingStatus;
import com.example.project.services.serviceImp.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingServiceImpl;

    // Create booking - only TENANT
    @PostMapping
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingServiceImpl.createBooking(bookingDTO));
    }

    // Cancel booking - TENANT or ADMIN
    @PostMapping("/{bookingId}/cancel")
    @PreAuthorize("hasAnyRole('TENANT', 'ADMIN')")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingServiceImpl.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }

    // Get specific booking - TENANT, OWNER, ADMIN
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('TENANT', 'OWNER', 'ADMIN')")
    public ResponseEntity<BookingDTO> getBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingServiceImpl.getBooking(id));
    }

    // Get all bookings - only ADMIN
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingServiceImpl.getAllBookings());
    }

    // Get bookings by tenant - only TENANT
    @GetMapping("/tenant/{tenantId}")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<BookingDTO>> getBookingsByTenant(@PathVariable Long tenantId) {
        List<BookingDTO> bookings = bookingServiceImpl.getBookingsByTenant(tenantId);
        return ResponseEntity.ok(bookings);
    }

    // Get bookings by owner - only OWNER
    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<BookingDTO>> getBookingsByOwner(@PathVariable Long ownerId) {
        List<BookingDTO> bookings = bookingServiceImpl.getBookingsByOwner(ownerId);
        return ResponseEntity.ok(bookings);
    }

    // Update booking status - OWNER or ADMIN
    @PostMapping("/{bookingId}/status")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Void> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status
    ) {
        bookingServiceImpl.updateBookingStatus(bookingId, status);
        return ResponseEntity.ok().build();
    }
}
