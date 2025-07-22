package com.psptech.homerservice.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.psptech.homeservice.entity.ServiceProvider;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

	Optional<ServiceProvider> findByContactNo(String contactNo);

	Optional<ServiceProvider> findByName(String name);

	@Query("SELECT DISTINCT sp FROM ServiceProvider sp JOIN sp.professions p "
			+ "WHERE LOWER(sp.city) LIKE LOWER(CONCAT('%', :city, '%')) "
			+ "OR LOWER(p.name) LIKE LOWER(CONCAT('%', :profession, '%'))")
	Page<ServiceProvider> findByCityContainingIgnoreCaseOrProfessionContainingIgnoreCase(@Param("city") String city,
			@Param("profession") String profession, Pageable pageable);
}