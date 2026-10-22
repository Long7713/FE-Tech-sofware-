package com.zoo.guide.service;

import com.zoo.guide.entity.Language;
import com.zoo.guide.exception.NotFoundException;
import com.zoo.guide.repository.LanguageRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LanguageService {

    private final LanguageRepository languages;

    public LanguageService(LanguageRepository languages) {
        this.languages = languages;
    }

    public List<Language> list(boolean onlyActive) {
        return onlyActive ? languages.findByActiveTrue() : languages.findAll();
    }

    public Language create(Language l) {
        l.setId(null);
        return languages.save(l);
    }

    public Language update(Long id, Language body) {
        Language l = languages.findById(id).orElseThrow(() -> new NotFoundException("Khong tim thay ngon ngu " + id));
        l.setCode(body.getCode());
        l.setName(body.getName());
        l.setActive(body.isActive());
        return languages.save(l);
    }
}
