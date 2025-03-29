package com.example.project.repositories;

import com.example.project.entities.Booking;
import com.example.project.entities.Owner;
import com.example.project.entities.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByTenantId(Long tenantId);
    List<Booking> findByFlatId(Long flatId);

    List<Booking> findByTenant(Tenant tenant);

    List<Booking> findByFlatOwner(Owner owner);
}
