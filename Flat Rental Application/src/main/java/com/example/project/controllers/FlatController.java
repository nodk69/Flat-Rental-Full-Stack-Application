package com.example.project.controllers;

import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Flat;
import com.example.project.entities.User;
import com.example.project.entities.enums.FlatStatus;
import com.example.project.entities.enums.ListedByType;
import com.example.project.entities.enums.Role;
import com.example.project.repositories.UserRepository;
import com.example.project.services.interfaces.FlatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/flats")
public class FlatController {

    private static final Logger logger = LoggerFactory.getLogger(FlatController.class);

    @Autowired
    private FlatService flatServiceImpl;

    @Autowired
    private UserRepository userRepository;

    // OWNER
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('OWNER_CREATE')")
    public ResponseEntity<?> addFlat(
            @RequestPart("propertyData") String propertyJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            Authentication authentication) {

        System.out.println(" Received Payload: " + propertyJson);

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User is not authenticated."));
        }

        // Fetch authenticated owner
        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        if (!owner.getRole().equals(Role.OWNER)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Only owners can add flats."));
        }

        // Manually Parse JSON into FlatDTO
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> payload;
        try {
            payload = objectMapper.readValue(propertyJson, Map.class);
        } catch (JsonProcessingException e) {
            System.err.println("❌ JSON Parsing Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid JSON format", "details", e.getMessage()));
        }

        // Extract Nested Data
        Map<String, Object> basicDetails = (Map<String, Object>) payload.get("basicDetails");
        Map<String, Object> propertyDetails = (Map<String, Object>) payload.get("propertyDetails");
        Map<String, Object> priceDetails = (Map<String, Object>) payload.get("priceDetails");
        Map<String, Object> advancedDetails = (Map<String, Object>) payload.get("advancedDetails");
        Map<String, Object> verification = (Map<String, Object>) payload.get("verification");

        // Convert `monthlyRent` Safely
        String rentString = (String) priceDetails.getOrDefault("monthlyRent", "0");
        Double monthlyRent = rentString.isEmpty() ? 0.0 : Double.parseDouble(rentString);

        // Process and Store Images
        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                String imageUrl = saveImage(image);
                imageUrls.add(imageUrl);
            }
        }

        //Construct FlatDTO Manually
        FlatDTO flatDTO = FlatDTO.builder()
                .propertyType((String) basicDetails.getOrDefault("propertyType", ""))
                .listingType((String) basicDetails.getOrDefault("listingType", ""))
                .city((String) basicDetails.getOrDefault("city", ""))
                .locality((String) propertyDetails.getOrDefault("locality", ""))
                .bhk((String) propertyDetails.getOrDefault("bhk", "1"))
                .furnishType((String) propertyDetails.getOrDefault("furnishType", ""))
                .monthlyRent((String) priceDetails.getOrDefault("monthlyRent", "0"))
                .availableFrom((String) priceDetails.getOrDefault("availableFrom", ""))
                .securityDeposit((String) priceDetails.getOrDefault("securityDeposit", ""))
                .ageOfProperty((String) advancedDetails.getOrDefault("ageOfProperty", ""))
                .bathroom((Integer) advancedDetails.getOrDefault("bathroom", 0))
                .balcony((Integer) advancedDetails.getOrDefault("balcony", 0))
                .coveredParking((Integer) advancedDetails.getOrDefault("coveredParking", 0))
                .openParking((Integer) advancedDetails.getOrDefault("openParking", 0))
                .propertyDescription((String) advancedDetails.getOrDefault("propertyDescription", ""))
                .selectedAmenities((List<String>) payload.getOrDefault("selectedAmenities", List.of()))
                .selectedFlatFurnishings((List<String>) payload.getOrDefault("selectedFlatFurnishings", List.of()))
                .selectedLegal((List<String>) advancedDetails.getOrDefault("selectedLegal", List.of()))
                .visitDate((String) verification.getOrDefault("visitDate", ""))
                .phoneNumber((String) verification.getOrDefault("phoneNumber", ""))
                .ownerId(owner.getId()) // Assign owner
                .status(FlatStatus.AVAILABLE) // Default status
                .listedBy(ListedByType.valueOf((String) payload.getOrDefault("listedBy", "LANDLORD"))) // Convert String to Enum
                .imageUrls(imageUrls)
                .build();

        System.out.println("Constructed FlatDTO: " + flatDTO);

        FlatDTO savedFlat = flatServiceImpl.createFlat(flatDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFlat);
    }


    //Dummy image upload function (Replace with S3/local storage logic)
    private String saveImage(MultipartFile file) {
        try {
            // 🔹 Create "uploads" folder if it doesn't exist
            String uploadDir = "uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 🔹 Save file to the folder
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destinationFile = new File(uploadDir + fileName);
            file.transferTo(destinationFile);

            // 🔹 Return file path as URL (Modify to use actual domain if needed)
            return "http://localhost:8080/uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image: " + e.getMessage());
        }
    }

    // OWNER
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('OWNER_UPDATE')")
    public ResponseEntity<FlatDTO> updateFlat(@PathVariable Long id, @RequestBody FlatDTO flatDTO) {
        try {
            FlatDTO updatedFlat = flatServiceImpl.updateFlat(id, flatDTO);
            return ResponseEntity.ok(updatedFlat);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // PUBLIC
    @GetMapping("/{id}")
    public ResponseEntity<?> getFlatById(@PathVariable Long id) {
        System.out.println("From controller - ID: " + id);
        try {
            FlatDTO flatDTO = flatServiceImpl.getFlatById(id);
            return ResponseEntity.ok(flatDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Flat not found");
        }
    }

    // PUBLIC
    @GetMapping
    public ResponseEntity<List<FlatDTO>> getAllFlats() {
        return ResponseEntity.ok(flatServiceImpl.getAllFlats());
    }

    // OWNER
    @GetMapping("/owner/flats")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<FlatDTO>> getFlatsByOwner(Authentication authentication) {

        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(()->new RuntimeException("Owner not found"));

        List<FlatDTO> flats = flatServiceImpl.getFlatsByOwner(owner.getId());
        return ResponseEntity.ok(flats);
    }

    // TENANT
    @GetMapping("/search")
    @PreAuthorize("hasRole('TENANT')")
    public ResponseEntity<List<Flat>> searchFlat(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String bhk,
            @RequestParam(required = false) Double minRent,
            @RequestParam(required = false) Double maxRent,
            @RequestParam(required = false) String furnishType,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) String listedBy
    ) {
        List<Flat> flats = flatServiceImpl.searchFlats(
                city,
                bhk,
                minRent,
                maxRent,
                furnishType,
                propertyType,
                listedBy
        );
        return ResponseEntity.ok(flats);
    }


    // OWNER or ADMIN
    @PostMapping("/{flatId}/status")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Void> updateFlatStatus(@PathVariable Long flatId, @RequestParam FlatStatus status) {
        flatServiceImpl.updateFlatStatus(flatId, status);
        return ResponseEntity.ok().build();
    }

    // OWNER
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> deleteFlat(@PathVariable Long id) {
        flatServiceImpl.deleteFlat(id);
        return ResponseEntity.noContent().build();
    }
}
