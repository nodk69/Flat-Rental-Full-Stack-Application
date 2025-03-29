package com.example.project.services.interfaces;

import com.example.project.DTO.FlatDTO;
import com.example.project.entities.Flat;
import com.example.project.entities.enums.FlatStatus;

import java.util.List;

public interface FlatService {

    FlatDTO createFlat(FlatDTO flatDTO);

   // FlatDTO getFlat(Long id);

    List<FlatDTO> getAllFlats();

    FlatDTO getFlatById(Long id);

    void deleteFlat(Long id);

//    List<Flat> searchFlat(String address, Integer bhk, Double minPrice, Double maxPrice,String furnishingStatus, String propertyType, String listedBy);

    List<Flat> searchFlats(
            String city,
            String bhk,
            Double minRent,
            Double maxRent,
            String furnishType,
            String propertyType,
            String listedBy
    );

    void updateFlatStatus(Long flatId, FlatStatus status);

    FlatDTO updateFlat(Long id, FlatDTO flatDTO);

    List<FlatDTO> getFlatsByOwner(Long ownerId);
}
