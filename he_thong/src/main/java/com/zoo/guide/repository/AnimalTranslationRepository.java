package com.zoo.guide.repository;

import com.zoo.guide.entity.AnimalTranslation;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalTranslationRepository extends JpaRepository<AnimalTranslation, Long> {
    Optional<AnimalTranslation> findByAnimalIdAndLanguageCode(Long animalId, String code);
    List<AnimalTranslation> findByAnimalId(Long animalId);
    void deleteByAnimalId(Long animalId);
}
