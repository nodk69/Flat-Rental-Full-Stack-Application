package com.example.project.services.interfaces;

import com.example.project.DTO.OwnerDTO;
import com.example.project.entities.Owner;

import java.util.List;
import java.util.Optional;

public interface OwnerService {
    OwnerDTO createOwner(OwnerDTO ownerDTO);
    OwnerDTO getOwner(Long id);
    List<OwnerDTO> getAllOwners();

    OwnerDTO getOwnerById(Long id);

    void deleteOwnerById(Long id);

    OwnerDTO updateOwner(Long id, OwnerDTO ownerDTO);

    Optional<Owner> findByEmail(String email);
}

