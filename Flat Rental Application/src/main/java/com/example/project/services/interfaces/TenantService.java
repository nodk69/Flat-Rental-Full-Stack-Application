package com.example.project.services.interfaces;

import com.example.project.DTO.TenantDTO;
import com.example.project.entities.Tenant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface TenantService {
    TenantDTO createTenant(TenantDTO tenantDTO);

    TenantDTO getTenantById(Long id);

    TenantDTO getTenant(Long id);

    List<TenantDTO> getAllTenants();

    void deleteTenant(Long id);

    TenantDTO updateTenant(Long id, TenantDTO tenantDTO);


    Optional<Tenant> findByEmail(String email);
}
