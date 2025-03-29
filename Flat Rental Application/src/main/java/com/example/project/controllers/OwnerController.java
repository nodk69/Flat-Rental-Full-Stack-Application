package com.example.project.controllers;

import com.example.project.DTO.OwnerDTO;
import com.example.project.DTO.FlatDTO;
import com.example.project.DTO.BookingDTO;
import com.example.project.services.interfaces.OwnerService;
import com.example.project.services.interfaces.FlatService;
import com.example.project.services.interfaces.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerServiceImpl;

    @Autowired
    private FlatService flatServiceImpl;

    @Autowired
    private BookingService bookingServiceImpl;

    // [Public] – Register a new owner
    @PostMapping
    public ResponseEntity<OwnerDTO> createOwner(@RequestBody OwnerDTO ownerDTO) {
        return ResponseEntity.ok(ownerServiceImpl.createOwner(ownerDTO));
    }

    // [Owner/Admin] – Fetch owner details
    @PreAuthorize("hasRole('OWNER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<OwnerDTO> getOwner(@PathVariable Long id) {
        return ResponseEntity.ok(ownerServiceImpl.getOwnerById(id));
    }

    // [Admin] – Fetch all owners
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<OwnerDTO>> getAllOwners() {
        return ResponseEntity.ok(ownerServiceImpl.getAllOwners());
    }

    // [Owner] – Update own profile
    @PreAuthorize("hasRole('OWNER')")
    @PutMapping("/{id}")
    public ResponseEntity<OwnerDTO> updateOwnerProfile(
            @PathVariable Long id,
            @RequestBody OwnerDTO ownerDTO
    ) {
        OwnerDTO updatedOwner = ownerServiceImpl.updateOwner(id, ownerDTO);
        return ResponseEntity.ok(updatedOwner);
    }

    // [Owner] – View all flats posted by the owner
    @PreAuthorize("hasRole('OWNER')")
    @GetMapping("/{ownerId}/flats")
    public ResponseEntity<List<FlatDTO>> viewMyFlats(@PathVariable Long ownerId) {
        List<FlatDTO> flats = flatServiceImpl.getFlatsByOwner(ownerId);
        return ResponseEntity.ok(flats);
    }

    // [Owner] – View all booking requests received on owner’s flats
    @PreAuthorize("hasRole('OWNER')")
    @GetMapping("/{ownerId}/bookings")
    public ResponseEntity<List<BookingDTO>> viewBookingRequests(@PathVariable Long ownerId) {
        List<BookingDTO> bookings = bookingServiceImpl.getBookingsByOwner(ownerId);
        return ResponseEntity.ok(bookings);
    }

    // [Admin] – Delete owner
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {
        ownerServiceImpl.deleteOwnerById(id);
        return ResponseEntity.noContent().build();
    }
}
