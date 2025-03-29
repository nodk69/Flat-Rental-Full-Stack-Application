package com.example.project.services.serviceImp;

import com.example.project.DTO.TenantDTO;
import com.example.project.entities.Tenant;
import com.example.project.repositories.TenantRepository;
import com.example.project.services.interfaces.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TenantServiceImpl implements TenantService {

    @Autowired
    private TenantRepository tenantRepository;


    @Override
    public TenantDTO createTenant(TenantDTO tenantDTO) {
        Tenant tenant = new Tenant();
        tenant.setUsername(tenantDTO.getName());
        tenant.setEmail(tenantDTO.getEmail());
        tenant.setPhone(tenantDTO.getPhone());
        Tenant savedTenant = tenantRepository.save(tenant);
        return new TenantDTO(savedTenant.getId(), savedTenant.getUsername(), savedTenant.getEmail(), savedTenant.getPhone());
    }

    @Override
    public TenantDTO getTenantById(Long id) {
        return null;
    }

    @Override
    public TenantDTO getTenant(Long id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        return new TenantDTO(
                tenant.getId(),
                tenant.getUsername(),
                tenant.getEmail(),
                tenant.getPhone()
        );
    }

    @Override
    public List<TenantDTO> getAllTenants() {
        return tenantRepository.findAll()
                .stream()
                .map(tenant -> new TenantDTO(
                        tenant.getId(),
                        tenant.getUsername(),
                        tenant.getEmail(),
                        tenant.getPhone()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteTenant(Long id) {

        if(tenantRepository.existsById(id)){
            tenantRepository.deleteById(id);
        }else{
            throw new RuntimeException("Tenant with id "+ id + " does not found");
        }
    }

    @Override
    public TenantDTO updateTenant(Long id, TenantDTO tenantDTO) {

        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        if (tenantDTO.getName() != null) tenant.setUsername(tenantDTO.getName());
        if (tenantDTO.getEmail() != null) tenant.setEmail(tenantDTO.getEmail());
        if (tenantDTO.getPhone() != null) tenant.setPhone(tenantDTO.getPhone());

        Tenant updatedTenant = tenantRepository.save(tenant);

        return new TenantDTO(
                updatedTenant.getId(),
                updatedTenant.getUsername(),
                updatedTenant.getEmail(),
                updatedTenant.getPhone()
        );
    }

    @Override
    public Optional<Tenant> findByEmail(String email) {
        return tenantRepository.findByEmail(email);
    }

}

