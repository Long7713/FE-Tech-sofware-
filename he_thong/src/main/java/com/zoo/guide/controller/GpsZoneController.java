package com.zoo.guide.controller;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.entity.GpsZone;
import com.zoo.guide.service.GpsZoneService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gps-zones")
public class GpsZoneController {

    private final GpsZoneService service;

    public GpsZoneController(GpsZoneService service) {
        this.service = service;
    }

    @GetMapping
    public List<GpsZone> list(@RequestParam(defaultValue = "true") boolean onlyActive) {
        return service.list(onlyActive);
    }

    /** Mobile goi khi vi tri thay doi; 204 neu chua vao vung nao. */
    @GetMapping("/nearby")
    public ResponseEntity<NearbyResult> nearby(@RequestParam double lat, @RequestParam double lng,
                                               @RequestParam(defaultValue = "vi") String lang) {
        return service.nearby(lat, lng, lang).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping
    public GpsZone create(@Valid @RequestBody GpsZoneRequest r) {
        return service.create(r);
    }

    @PutMapping("/{id}")
    public GpsZone update(@PathVariable Long id, @Valid @RequestBody GpsZoneRequest r) {
        return service.update(id, r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
