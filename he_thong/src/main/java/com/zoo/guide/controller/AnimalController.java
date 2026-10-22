package com.zoo.guide.controller;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.entity.Animal;
import com.zoo.guide.entity.AnimalTranslation;
import com.zoo.guide.service.AnimalService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/animals")
public class AnimalController {

    private final AnimalService service;

    public AnimalController(AnimalService service) {
        this.service = service;
    }

    @GetMapping
    public List<Animal> list(@RequestParam(required = false) Long zoneId) {
        return service.list(zoneId);
    }

    /** Chi tiet + thuyet minh theo ngon ngu, vd: /api/animals/1?lang=en */
    @GetMapping("/{id}")
    public AnimalDetail detail(@PathVariable Long id, @RequestParam(defaultValue = "vi") String lang) {
        return service.detail(id, lang);
    }

    @PostMapping
    public Animal create(@Valid @RequestBody AnimalRequest r) {
        return service.create(r);
    }

    @PutMapping("/{id}")
    public Animal update(@PathVariable Long id, @Valid @RequestBody AnimalRequest r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}/translations")
    public List<AnimalTranslation> translations(@PathVariable Long id) {
        return service.listTranslations(id);
    }

    @PutMapping("/{id}/translations/{lang}")
    public AnimalTranslation saveTranslation(@PathVariable Long id, @PathVariable String lang,
                                             @Valid @RequestBody TranslationRequest r) {
        return service.saveTranslation(id, lang, r);
    }
}
