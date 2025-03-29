package com.example.project.DTO;

import com.example.project.entities.enums.FlatStatus;
import com.example.project.entities.enums.ListedByType;
import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FlatDTO {

    private Long id;

    // Basic Details
    private String propertyType;
    private String listingType;
    private String city;

    // Property Details
    private String locality;
    private String bhk;
    private String furnishType;

    // Price Details
    private String monthlyRent;
    private String availableFrom;
    private String securityDeposit;

    // Advanced Details
    private String ageOfProperty;
    private int bathroom;
    private int balcony;
    private int coveredParking;
    private int openParking;
    private String propertyDescription;

    // Selected Options
    private List<String> selectedAmenities;
    private List<String> selectedFlatFurnishings;
    private List<String> selectedLegal;

    private List<String> imageUrls;
    //Updated to Enum
    private FlatStatus status;
    private ListedByType listedBy;

    // Owner & Verification
    private Long ownerId;
    private String visitDate;
    private String phoneNumber;

}

