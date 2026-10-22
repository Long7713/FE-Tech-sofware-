package com.zoo.guide.service;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.entity.GpsZone;
import com.zoo.guide.exception.NotFoundException;
import com.zoo.guide.repository.AnimalRepository;
import com.zoo.guide.repository.GpsZoneRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class GpsZoneService {

    private final GpsZoneRepository gpsZones;
    private final AnimalRepository animals;
    private final AnimalService animalService;

    public GpsZoneService(GpsZoneRepository gpsZones, AnimalRepository animals, AnimalService animalService) {
        this.gpsZones = gpsZones;
        this.animals = animals;
        this.animalService = animalService;
    }

    public List<GpsZone> list(boolean onlyActive) {
        return onlyActive ? gpsZones.findByStatus("ACTIVE") : gpsZones.findAll();
    }

    public GpsZone get(Long id) {
        return gpsZones.findById(id).orElseThrow(() -> new NotFoundException("Khong tim thay vung GPS " + id));
    }

    public GpsZone create(GpsZoneRequest r) {
        return gpsZones.save(apply(new GpsZone(), r));
    }

    public GpsZone update(Long id, GpsZoneRequest r) {
        return gpsZones.save(apply(get(id), r));
    }

    public void delete(Long id) {
        get(id);
        gpsZones.deleteById(id);
    }

    /** Tim vung GPS dang hoat dong chua toa do nguoi dung (vung gan nhat neu chong lan). */
    public Optional<NearbyResult> nearby(double lat, double lng, String lang) {
        return gpsZones.findByStatus("ACTIVE").stream()
                .map(z -> new Object[]{z, distanceM(lat, lng, z.getLatitude(), z.getLongitude())})
                .filter(p -> (double) p[1] <= ((GpsZone) p[0]).getRadiusM())
                .min(Comparator.comparingDouble(p -> (double) p[1]))
                .map(p -> {
                    GpsZone z = (GpsZone) p[0];
                    return new NearbyResult(view(z), (double) p[1], animalService.detail(z.getAnimal().getId(), lang));
                });
    }

    public GpsZoneView view(GpsZone z) {
        return new GpsZoneView(z.getId(), z.getLatitude(), z.getLongitude(), z.getRadiusM(), z.getStatus(),
                z.getAnimal().getId());
    }

    /** Khoang cach Haversine, don vi met. */
    static double distanceM(double lat1, double lon1, double lat2, double lon2) {
        double r = 6_371_000;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double h = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return 2 * r * Math.asin(Math.sqrt(h));
    }

    private GpsZone apply(GpsZone z, GpsZoneRequest r) {
        z.setAnimal(animals.findById(r.animalId())
                .orElseThrow(() -> new NotFoundException("Khong tim thay dong vat " + r.animalId())));
        z.setLatitude(r.latitude());
        z.setLongitude(r.longitude());
        z.setRadiusM(r.radiusM());
        z.setStatus(r.status() == null ? "ACTIVE" : r.status());
        return z;
    }
}
