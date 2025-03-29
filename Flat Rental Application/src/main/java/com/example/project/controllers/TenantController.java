package com.example.project.controllers;

import com.example.project.DTO.TenantDTO;
import com.example.project.services.interfaces.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/tenants")
public class TenantController {

    @Autowired
    private TenantService tenantServiceImpl;

    // [Public] – Register a new tenant
    @PostMapping
    public ResponseEntity<TenantDTO> createTenant(@RequestBody TenantDTO tenantDTO) {
        return ResponseEntity.ok(tenantServiceImpl.createTenant(tenantDTO));
    }

    // [Tenant/Admin] – Get tenant profile by ID
    @PreAuthorize("hasRole('TENANT') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<TenantDTO> getTenantById(@PathVariable Long id) {
        return ResponseEntity.ok(tenantServiceImpl.getTenantById(id));
    }

    // [Tenant] – Update tenant profile
    @PreAuthorize("hasRole('TENANT')")
    @PutMapping("/{id}")
    public ResponseEntity<TenantDTO> updateTenantProfile(
            @PathVariable Long id,
            @RequestBody TenantDTO tenantDTO
    ) {
        TenantDTO updatedTenant = tenantServiceImpl.updateTenant(id, tenantDTO);
        return ResponseEntity.ok(updatedTenant);
    }

    // [Admin] – Get all tenants
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<TenantDTO>> getAllTenants() {
        return ResponseEntity.ok(tenantServiceImpl.getAllTenants());
    }

    // [Admin/Tenant] – Delete a tenant by ID
    @PreAuthorize("hasRole('TENANT') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        tenantServiceImpl.deleteTenant(id);
        return ResponseEntity.noContent().build();
    }
}
