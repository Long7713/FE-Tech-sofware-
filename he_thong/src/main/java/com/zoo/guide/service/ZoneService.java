package com.zoo.guide.service;

import com.zoo.guide.entity.Zone;
import com.zoo.guide.exception.NotFoundException;
import com.zoo.guide.repository.AnimalRepository;
import com.zoo.guide.repository.ZoneRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ZoneService {

    private final ZoneRepository zones;
    private final AnimalRepository animals;

    public ZoneService(ZoneRepository zones, AnimalRepository animals) {
        this.zones = zones;
        this.animals = animals;
    }

    public List<Zone> list() {
        return zones.findAll();
    }

    public Zone get(Long id) {
        return zones.findById(id).orElseThrow(() -> new NotFoundException("Khong tim thay khu vuc " + id));
    }

    public Zone create(Zone z) {
        z.setId(null);
        if (z.getStatus() == null) {
            z.setStatus("ACTIVE");
        }
        return zones.save(z);
    }

    public Zone update(Long id, Zone body) {
        Zone z = get(id);
        z.setName(body.getName());
        z.setDescription(body.getDescription());
        if (body.getStatus() != null) {
            z.setStatus(body.getStatus());
        }
        z.setPolygonGeoJson(body.getPolygonGeoJson());
        return zones.save(z);
    }

    public void delete(Long id) {
        get(id);
        if (!animals.findByZoneId(id).isEmpty()) {
            throw new IllegalArgumentException("Khu vuc con dong vat, hay chuyen hoac xoa dong vat truoc");
        }
        zones.deleteById(id);
    }
}
