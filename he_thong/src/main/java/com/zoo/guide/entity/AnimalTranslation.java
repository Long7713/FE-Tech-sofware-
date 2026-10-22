package com.zoo.guide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "animal_translations", uniqueConstraints = @UniqueConstraint(columnNames = {"animal_id", "language_id"}))
public class AnimalTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "animal_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"zone"})
    private Animal animal;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "language_id")
    private Language language;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 200)
    private String sizeWeight;

    @Column(length = 200)
    private String lifespan;

    @Column(columnDefinition = "TEXT")
    private String behavior;

    @Column(columnDefinition = "TEXT")
    private String history;

    @Column(columnDefinition = "TEXT")
    private String narration;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Animal getAnimal() { return animal; }
    public void setAnimal(Animal animal) { this.animal = animal; }

    public Language getLanguage() { return language; }
    public void setLanguage(Language language) { this.language = language; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSizeWeight() { return sizeWeight; }
    public void setSizeWeight(String sizeWeight) { this.sizeWeight = sizeWeight; }

    public String getLifespan() { return lifespan; }
    public void setLifespan(String lifespan) { this.lifespan = lifespan; }

    public String getBehavior() { return behavior; }
    public void setBehavior(String behavior) { this.behavior = behavior; }

    public String getHistory() { return history; }
    public void setHistory(String history) { this.history = history; }

    public String getNarration() { return narration; }
    public void setNarration(String narration) { this.narration = narration; }

}
