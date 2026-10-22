package com.zoo.guide.service;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.entity.*;
import com.zoo.guide.exception.NotFoundException;
import com.zoo.guide.repository.*;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnimalService {

    private static final String DEFAULT_LANG = "vi";

    private final AnimalRepository animals;
    private final ZoneRepository zones;
    private final LanguageRepository languages;
    private final AnimalTranslationRepository translations;
    private final GpsZoneRepository gpsZones;

    public AnimalService(AnimalRepository animals, ZoneRepository zones, LanguageRepository languages,
                         AnimalTranslationRepository translations, GpsZoneRepository gpsZones) {
        this.animals = animals;
        this.zones = zones;
        this.languages = languages;
        this.translations = translations;
        this.gpsZones = gpsZones;
    }

    public List<Animal> list(Long zoneId) {
        return zoneId == null ? animals.findAll() : animals.findByZoneId(zoneId);
    }

    public Animal get(Long id) {
        return animals.findById(id).orElseThrow(() -> new NotFoundException("Khong tim thay dong vat " + id));
    }

    public Animal create(AnimalRequest r) {
        return animals.save(apply(new Animal(), r));
    }

    public Animal update(Long id, AnimalRequest r) {
        return animals.save(apply(get(id), r));
    }

    @Transactional
    public void delete(Long id) {
        get(id);
        gpsZones.deleteByAnimalId(id);
        translations.deleteByAnimalId(id);
        animals.deleteById(id);
    }

    /** Chi tiet dong vat theo ngon ngu; thieu ban dich thi lui ve tieng Viet. */
    public AnimalDetail detail(Long id, String lang) {
        Animal a = get(id);
        AnimalTranslation t = translations.findByAnimalIdAndLanguageCode(id, lang)
                .or(() -> translations.findByAnimalIdAndLanguageCode(id, DEFAULT_LANG)).orElse(null);
        return toDetail(a, t, t == null ? lang : t.getLanguage().getCode());
    }

    public List<AnimalTranslation> listTranslations(Long animalId) {
        get(animalId);
        return translations.findByAnimalId(animalId);
    }

    public AnimalTranslation saveTranslation(Long animalId, String langCode, TranslationRequest r) {
        Animal a = get(animalId);
        Language l = languages.findByCode(langCode)
                .orElseThrow(() -> new NotFoundException("Khong co ngon ngu " + langCode));
        AnimalTranslation t = translations.findByAnimalIdAndLanguageCode(animalId, langCode)
                .orElseGet(AnimalTranslation::new);
        t.setAnimal(a);
        t.setLanguage(l);
        t.setName(r.name());
        t.setDescription(r.description());
        t.setSizeWeight(r.sizeWeight());
        t.setLifespan(r.lifespan());
        t.setBehavior(r.behavior());
        t.setHistory(r.history());
        t.setNarration(r.narration());
        return translations.save(t);
    }

    private AnimalDetail toDetail(Animal a, AnimalTranslation t, String lang) {
        Zone z = a.getZone();
        return new AnimalDetail(a.getId(), lang, t != null ? t.getName() : a.getName(), a.getScientificName(),
                a.getKingdom(), a.getPhylum(), a.getClassName(), a.getOrderName(), a.getFamily(), a.getGenus(),
                a.getImageUrl(), z == null ? null : z.getId(), z == null ? null : z.getName(),
                t == null ? null : t.getDescription(), t == null ? null : t.getSizeWeight(),
                t == null ? null : t.getLifespan(), t == null ? null : t.getBehavior(),
                t == null ? null : t.getHistory(), t == null ? null : t.getNarration());
    }

    private Animal apply(Animal a, AnimalRequest r) {
        a.setZone(r.zoneId() == null ? null : zones.findById(r.zoneId())
                .orElseThrow(() -> new NotFoundException("Khong tim thay khu vuc " + r.zoneId())));
        a.setName(r.name());
        a.setScientificName(r.scientificName());
        a.setKingdom(r.kingdom());
        a.setPhylum(r.phylum());
        a.setClassName(r.className());
        a.setOrderName(r.orderName());
        a.setFamily(r.family());
        a.setGenus(r.genus());
        a.setImageUrl(r.imageUrl());
        a.setStatus(r.status() == null ? "ACTIVE" : r.status());
        return a;
    }
}
