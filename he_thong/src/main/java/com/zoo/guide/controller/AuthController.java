package com.zoo.guide.controller;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.service.AuthService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/auth/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest r) {
        return auth.register(r);
    }

    @PostMapping("/auth/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest r) {
        return auth.login(r);
    }

    @GetMapping("/me")
    public UserInfo me(Principal p) {
        return auth.me(p.getName());
    }

    @PutMapping("/me")
    public UserInfo updateMe(Principal p, @Valid @RequestBody UpdateProfileRequest r) {
        return auth.updateProfile(p.getName(), r);
    }
}
