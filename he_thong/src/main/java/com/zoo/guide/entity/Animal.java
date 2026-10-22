package com.zoo.guide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "animals")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "zone_id")
    private Zone zone;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(length = 120)
    private String scientificName;

    @Column(length = 60)
    private String kingdom;

    @Column(length = 60)
    private String phylum;

    @Column(name = "class_name", length = 60)
    private String className;

    @Column(name = "order_name", length = 60)
    private String orderName;

    @Column(length = 60)
    private String family;

    @Column(length = 60)
    private String genus;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 20)
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Zone getZone() { return zone; }
    public void setZone(Zone zone) { this.zone = zone; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getKingdom() { return kingdom; }
    public void setKingdom(String kingdom) { this.kingdom = kingdom; }

    public String getPhylum() { return phylum; }
    public void setPhylum(String phylum) { this.phylum = phylum; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public String getOrderName() { return orderName; }
    public void setOrderName(String orderName) { this.orderName = orderName; }

    public String getFamily() { return family; }
    public void setFamily(String family) { this.family = family; }

    public String getGenus() { return genus; }
    public void setGenus(String genus) { this.genus = genus; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

}
