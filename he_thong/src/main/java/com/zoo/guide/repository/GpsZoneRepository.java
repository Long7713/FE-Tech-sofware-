package com.zoo.guide.repository;

import com.zoo.guide.entity.GpsZone;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpsZoneRepository extends JpaRepository<GpsZone, Long> {
    List<GpsZone> findByStatus(String status);
    void deleteByAnimalId(Long animalId);
}
