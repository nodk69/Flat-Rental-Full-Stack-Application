package com.example.project.services.serviceImp;

import com.example.project.DTO.OwnerDTO;
import com.example.project.entities.Owner;
import com.example.project.repositories.OwnerRepository;
import com.example.project.services.interfaces.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public OwnerDTO createOwner(OwnerDTO ownerDTO) {
        Owner owner = new Owner();

        owner.setUsername(ownerDTO.getName());
        owner.setEmail(ownerDTO.getEmail());
        owner.setPhone(ownerDTO.getPhone());
        Owner savedOwner = ownerRepository.save(owner);
        return new OwnerDTO(savedOwner.getId(), savedOwner.getUsername(), savedOwner.getEmail(), savedOwner.getPhone());
    }

    @Override
    public OwnerDTO getOwner(Long id) {
        Owner owner = ownerRepository.findById(id).orElseThrow(() -> new RuntimeException("Owner not found"));
        return new OwnerDTO(owner.getId(), owner.getUsername(), owner.getEmail(), owner.getPhone());
    }

    @Override
    public List<OwnerDTO> getAllOwners() {
        return ownerRepository.findAll().stream()
                .map(owner -> new OwnerDTO(owner.getId(), owner.getUsername(), owner.getEmail(), owner.getPhone()))
                .collect(Collectors.toList());
    }

    @Override
    public OwnerDTO getOwnerById(Long id) {
        Owner owner =ownerRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));

        return new OwnerDTO(
                owner.getId(),
                owner.getUsername(),
                owner.getEmail(),
                owner.getPhone()
        );
    }

    @Override
    public void deleteOwnerById(Long id) {

        if(ownerRepository.existsById(id)){
            ownerRepository.deleteById((id));
        }else{
            throw new RuntimeException("User with ID "+ id + "does not exists");
        }
    }

    @Override
    public OwnerDTO updateOwner(Long id, OwnerDTO ownerDTO) {

        Owner owner = ownerRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found"));

        Owner updateOwner = ownerRepository.save(owner);

        return new OwnerDTO(
                updateOwner.getId(),
                updateOwner.getUsername(),
                updateOwner.getEmail(),
                updateOwner.getPhone()
        );
    }

    @Override
    public Optional<Owner> findByEmail(String email) {
        return ownerRepository.findByEmail(email);
    }

}

