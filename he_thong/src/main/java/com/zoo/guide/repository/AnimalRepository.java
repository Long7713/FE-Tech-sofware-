package com.zoo.guide.repository;

import com.zoo.guide.entity.Animal;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByZoneId(Long zoneId);
}
