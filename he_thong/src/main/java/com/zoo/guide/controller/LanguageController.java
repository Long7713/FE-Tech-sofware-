package com.zoo.guide.controller;

import com.zoo.guide.entity.Language;
import com.zoo.guide.service.LanguageService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/languages")
public class LanguageController {

    private final LanguageService service;

    public LanguageController(LanguageService service) {
        this.service = service;
    }

    @GetMapping
    public List<Language> list(@RequestParam(defaultValue = "true") boolean onlyActive) {
        return service.list(onlyActive);
    }

    @PostMapping
    public Language create(@RequestBody Language l) {
        return service.create(l);
    }

    @PutMapping("/{id}")
    public Language update(@PathVariable Long id, @RequestBody Language l) {
        return service.update(id, l);
    }
}
