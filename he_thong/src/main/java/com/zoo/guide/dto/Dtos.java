package com.zoo.guide.dto;

import jakarta.validation.constraints.*;

public final class Dtos {

    private Dtos() {
    }

    public record RegisterRequest(@Email @NotBlank String email, @NotBlank @Size(min = 6) String password,
                                  @NotBlank String fullName, String preferredLanguage) {
    }

    public record LoginRequest(@NotBlank String email, @NotBlank String password) {
    }

    public record AuthResponse(String token, UserInfo user) {
    }

    public record UserInfo(Long id, String email, String fullName, String role, String preferredLanguage) {
    }

    public record UpdateProfileRequest(@NotBlank String fullName, String preferredLanguage) {
    }

    public record AnimalRequest(Long zoneId, @NotBlank String name, String scientificName, String kingdom,
                                String phylum, String className, String orderName, String family, String genus,
                                String imageUrl, String status) {
    }

    public record TranslationRequest(@NotBlank String name, String description, String sizeWeight, String lifespan,
                                     String behavior, String history, String narration) {
    }

    public record GpsZoneRequest(@NotNull Long animalId, @NotNull Double latitude, @NotNull Double longitude,
                                 @NotNull @Positive Double radiusM, String status) {
    }

    /** Thong tin dong vat da ghep ban dich theo ngon ngu nguoi dung chon. */
    public record AnimalDetail(Long id, String lang, String name, String scientificName, String kingdom,
                               String phylum, String className, String orderName, String family, String genus,
                               String imageUrl, Long zoneId, String zoneName, String description, String sizeWeight,
                               String lifespan, String behavior, String history, String narration) {
    }

    public record GpsZoneView(Long id, double latitude, double longitude, double radiusM, String status,
                              Long animalId) {
    }

    public record NearbyResult(GpsZoneView zone, double distanceM, AnimalDetail animal) {
    }
}
