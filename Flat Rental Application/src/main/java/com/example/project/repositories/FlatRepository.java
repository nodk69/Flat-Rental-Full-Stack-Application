package com.example.project.repositories;

import com.example.project.entities.Flat;
import com.example.project.entities.Owner;
import com.example.project.entities.enums.ListedByType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FlatRepository extends JpaRepository<Flat, Long> {

    @Query("SELECT f FROM Flat f WHERE " +
            "(COALESCE(:city, '') = '' OR LOWER(f.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(COALESCE(:bhk, '') = '' OR LOWER(f.bhk) = LOWER(:bhk)) AND " +
            "((:minRent IS NULL AND :maxRent IS NULL) OR " +
            "(:minRent IS NULL AND f.monthlyRent <= :maxRent) OR " +
            "(:maxRent IS NULL AND f.monthlyRent >= :minRent) OR " +
            "(f.monthlyRent BETWEEN :minRent AND :maxRent)) AND " +
            "(COALESCE(:furnishType, '') = '' OR LOWER(f.furnishType) = LOWER(:furnishType)) AND " +
            "(COALESCE(:propertyType, '') = '' OR LOWER(f.propertyType) = LOWER(:propertyType)) AND " +
            "(COALESCE(:listedBy, '') = '' OR f.listedBy = :listedBy)")
    List<Flat> searchFlats(
            @Param("city") String city,
            @Param("bhk") String bhk,  // ✅ Change to String to match database
            @Param("minRent") Double minRent,
            @Param("maxRent") Double maxRent,
            @Param("furnishType") String furnishType,
            @Param("propertyType") String propertyType,
            @Param("listedBy") ListedByType listedBy
    );


    List<Flat> findByOwner(Owner owner);
}

