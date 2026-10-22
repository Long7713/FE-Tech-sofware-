package com.zoo.guide.controller;

import com.zoo.guide.entity.Zone;
import com.zoo.guide.service.ZoneService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    private final ZoneService service;

    public ZoneController(ZoneService service) {
        this.service = service;
    }

    @GetMapping
    public List<Zone> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Zone get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public Zone create(@RequestBody Zone z) {
        return service.create(z);
    }

    @PutMapping("/{id}")
    public Zone update(@PathVariable Long id, @RequestBody Zone z) {
        return service.update(id, z);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
