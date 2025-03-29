package com.example.project.services.serviceImp;

import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Flat;
import com.example.project.entities.Owner;
import com.example.project.entities.enums.FlatStatus;
import com.example.project.entities.enums.ListedByType;
import com.example.project.repositories.FlatRepository;
import com.example.project.repositories.OwnerRepository;
import com.example.project.services.interfaces.FlatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlatServiceImpl implements FlatService {

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public FlatDTO createFlat(FlatDTO flatDTO) {
        System.out.println("🟢 Received FlatDTO: " + flatDTO);

        Owner owner = ownerRepository.findById(flatDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Flat flat = new Flat();
        flat.setPropertyType(flatDTO.getPropertyType());
        flat.setListingType(flatDTO.getListingType());
        flat.setCity(flatDTO.getCity());
        flat.setLocality(flatDTO.getLocality());
        flat.setBhk(flatDTO.getBhk());
        flat.setFurnishType(flatDTO.getFurnishType());

        //Convert and store rent as Double
        try {
            flat.setMonthlyRent(Double.parseDouble(flatDTO.getMonthlyRent()));
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid rent amount: " + flatDTO.getMonthlyRent());
        }

        flat.setAvailableFrom(flatDTO.getAvailableFrom());
        flat.setSecurityDeposit(flatDTO.getSecurityDeposit());

        //Advanced Details
        flat.setAgeOfProperty(flatDTO.getAgeOfProperty());
        flat.setBathroom(flatDTO.getBathroom());
        flat.setBalcony(flatDTO.getBalcony());
        flat.setCoveredParking(flatDTO.getCoveredParking());
        flat.setOpenParking(flatDTO.getOpenParking());
        flat.setPropertyDescription(flatDTO.getPropertyDescription());

        //Selected Options
        flat.setSelectedAmenities(flatDTO.getSelectedAmenities());
        flat.setSelectedFlatFurnishings(flatDTO.getSelectedFlatFurnishings());
        flat.setSelectedLegal(flatDTO.getSelectedLegal());

        //Convert ListedByType
        try {
            flat.setListedBy(ListedByType.valueOf(flatDTO.getListedBy().name()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid listedBy type: " + flatDTO.getListedBy());
        }

        //Assign owner
        flat.setOwner(owner);

        //Convert `visitDate` safely
        try {
            flat.setVisitDate(LocalDate.parse(flatDTO.getVisitDate()));
        } catch (Exception e) {
            throw new RuntimeException("Invalid visit date: " + flatDTO.getVisitDate());
        }

        flat.setPhoneNumber(flatDTO.getPhoneNumber());

        //Store image URLs
        flat.setImageUrls(flatDTO.getImageUrls());

        //Save and return DTO
        Flat savedFlat = flatRepository.save(flat);
        System.out.println("Saved Flat: " + savedFlat);

        return convertToDTO(savedFlat);
    }




    //Get Flat By ID
    @Override
    public FlatDTO getFlatById(Long id) {
        Flat flat = flatRepository.findById(id).orElseThrow(() -> new RuntimeException("Flat not found"));
        return convertToDTO(flat);
    }

    //Get All Flats
    @Override
    public List<FlatDTO> getAllFlats() {
        return flatRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //Delete Flat
    @Override
    public void deleteFlat(Long id) {
        if (!flatRepository.existsById(id)) {
            throw new RuntimeException("Flat with ID " + id + " not found");
        }
        flatRepository.deleteById(id);
    }

    //Search Flats
    @Override
    public List<Flat> searchFlats(String city, String bhk, Double minRent, Double maxRent,
                                  String furnishType, String propertyType, String listedBy) {

        //Convert bhk from String to Integer (Handle Nulls)
        //Convert BHK to match database format
        String formattedBhk = null;
        if (bhk != null && !bhk.trim().isEmpty() && !bhk.contains("BHK")) {
            formattedBhk = bhk + " BHK";  // Ensure format matches database
        } else {
            formattedBhk = bhk;  // Keep as is if already correct
        }

        //Convert listedBy to Enum (Handle Nulls)
        ListedByType listedByType = null;
        if (listedBy != null && !listedBy.trim().isEmpty()) {
            try {
                listedByType = ListedByType.valueOf(listedBy.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid ListedByType value: " + listedBy);
            }
        }

        //Set default values for rent range if not provided
        Double minPrice = (minRent != null) ? minRent : 0.0;
        Double maxPrice = (maxRent != null) ? maxRent : 9999999.0;

        //Pass only non-null values to the repository
        return flatRepository.searchFlats(city, formattedBhk, minPrice, maxPrice, furnishType, propertyType, listedByType);
    }




    //Update Flat
    @Override
    public FlatDTO updateFlat(Long id, FlatDTO flatDTO) {
        Flat flat = flatRepository.findById(id).orElseThrow(() -> new RuntimeException("Flat not found"));

        if (flatDTO.getPropertyType() != null) flat.setPropertyType(flatDTO.getPropertyType());
        if (flatDTO.getListingType() != null) flat.setListingType(flatDTO.getListingType());
        if (flatDTO.getCity() != null) flat.setCity(flatDTO.getCity());
        if (flatDTO.getLocality() != null) flat.setLocality(flatDTO.getLocality());
        if (flatDTO.getBhk() != null) flat.setBhk(flatDTO.getBhk());
        if (flatDTO.getFurnishType() != null) flat.setFurnishType(flatDTO.getFurnishType());
        if (flatDTO.getMonthlyRent() != null) flat.setMonthlyRent(Double.valueOf(flatDTO.getMonthlyRent()));
        if (flatDTO.getAvailableFrom() != null) flat.setAvailableFrom(flatDTO.getAvailableFrom());
        if (flatDTO.getSecurityDeposit() != null) flat.setSecurityDeposit(flatDTO.getSecurityDeposit());

        //Update advanced details
        if (flatDTO.getAgeOfProperty() != null) flat.setAgeOfProperty(flatDTO.getAgeOfProperty());
        flat.setBathroom(flatDTO.getBathroom());
        flat.setBalcony(flatDTO.getBalcony());
        flat.setCoveredParking(flatDTO.getCoveredParking());
        flat.setOpenParking(flatDTO.getOpenParking());
        if (flatDTO.getPropertyDescription() != null) flat.setPropertyDescription(flatDTO.getPropertyDescription());

        //Update selected options
        if (flatDTO.getSelectedAmenities() != null) flat.setSelectedAmenities(flatDTO.getSelectedAmenities());
        if (flatDTO.getSelectedFlatFurnishings() != null) flat.setSelectedFlatFurnishings(flatDTO.getSelectedFlatFurnishings());
        if (flatDTO.getSelectedLegal() != null) flat.setSelectedLegal(flatDTO.getSelectedLegal());

        //Update owner & verification details
        flat.setVisitDate(flatDTO.getVisitDate().isEmpty() ? null : LocalDate.parse(flatDTO.getVisitDate()));
        flat.setPhoneNumber(flatDTO.getPhoneNumber());

        //Save and return DTO
        Flat updatedFlat = flatRepository.save(flat);
        return convertToDTO(updatedFlat);
    }

    //Update Flat Status
    @Override
    public void updateFlatStatus(Long flatId, FlatStatus newStatus) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new RuntimeException("Flat not found with ID " + flatId));
        flat.setStatus(newStatus);
        flatRepository.save(flat);
    }

    //Get Flats by Owner
    @Override
    public List<FlatDTO> getFlatsByOwner(Long ownerId) {
        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        return flatRepository.findByOwner(owner).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private FlatDTO convertToDTO(Flat flat) {
        return FlatDTO.builder()
                .id(flat.getId())
                .propertyType(flat.getPropertyType())
                .listingType(flat.getListingType())
                .city(flat.getCity())
                .locality(flat.getLocality())
                .bhk(flat.getBhk())
                .furnishType(flat.getFurnishType())

                // Handle null safely for Double conversion
                .monthlyRent(flat.getMonthlyRent() == null ? "0" : String.valueOf(flat.getMonthlyRent()))
                .availableFrom(flat.getAvailableFrom() == null ? "" : flat.getAvailableFrom())
                .securityDeposit(flat.getSecurityDeposit() == null ? "" : flat.getSecurityDeposit())

                //Convert ListedByType enum to String
                .listedBy(flat.getListedBy() != null ? flat.getListedBy() : null)

                //Handle visitDate properly
                .visitDate(flat.getVisitDate() == null ? "" : flat.getVisitDate().toString())
                .phoneNumber(flat.getPhoneNumber() == null ? "" : flat.getPhoneNumber())

                //Ensure lists are not null (avoid NullPointerException)
                .selectedAmenities(flat.getSelectedAmenities() == null ? List.of() : flat.getSelectedAmenities())
                .selectedFlatFurnishings(flat.getSelectedFlatFurnishings() == null ? List.of() : flat.getSelectedFlatFurnishings())
                .selectedLegal(flat.getSelectedLegal() == null ? List.of() : flat.getSelectedLegal())

                //Store image URLs
                .imageUrls(flat.getImageUrls() == null ? List.of() : flat.getImageUrls())

                .ownerId(flat.getOwner() != null ? flat.getOwner().getId() : null)
                .build();
    }


}
