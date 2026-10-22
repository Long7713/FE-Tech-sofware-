package com.zoo.guide.repository;

import com.zoo.guide.entity.Language;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByCode(String code);
    List<Language> findByActiveTrue();
}
