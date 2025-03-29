package com.example.project.entities;

import com.example.project.converters.StringListConverter;
import com.example.project.entities.enums.FlatStatus;
import com.example.project.entities.enums.ListedByType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "flats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Basic Details
    private String propertyType;
    private String listingType;
    private String city;
    private String locality;

    //Property Details
    private String bhk; // Kept as String to match FlatDTO
    private String furnishType;

    //Price Details
    private Double monthlyRent;
    private String availableFrom;
    private String securityDeposit;

    //Advanced Details
    private String ageOfProperty;
    private int bathroom;
    private int balcony;
    private int coveredParking;
    private int openParking;
    private String propertyDescription;

    @Convert(converter = StringListConverter.class)
    private List<String> selectedAmenities;

    @Convert(converter = StringListConverter.class)
    private List<String> selectedFlatFurnishings;

    @Convert(converter = StringListConverter.class)
    private List<String> selectedLegal;

    @Convert(converter = StringListConverter.class) // Store as JSON array in DB
    private List<String> imageUrls;

    //Status
    @Enumerated(EnumType.STRING)
    private FlatStatus status = FlatStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    private ListedByType listedBy;

    //Owner & Verification
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = false)
    private User owner;

    private LocalDate visitDate;
    private String phoneNumber;


    @OneToMany(mappedBy = "flat", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
