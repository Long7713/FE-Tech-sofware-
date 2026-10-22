package com.zoo.guide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gps_zones")
public class GpsZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double radiusM;

    @Column(nullable = false, length = 20)
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Animal getAnimal() { return animal; }
    public void setAnimal(Animal animal) { this.animal = animal; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public double getRadiusM() { return radiusM; }
    public void setRadiusM(double radiusM) { this.radiusM = radiusM; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

}
