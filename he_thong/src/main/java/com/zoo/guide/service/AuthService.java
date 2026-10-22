package com.zoo.guide.service;

import com.zoo.guide.dto.Dtos.*;
import com.zoo.guide.entity.User;
import com.zoo.guide.exception.NotFoundException;
import com.zoo.guide.repository.UserRepository;
import com.zoo.guide.security.JwtService;
import java.time.LocalDateTime;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public AuthResponse register(RegisterRequest r) {
        if (users.existsByEmail(r.email())) {
            throw new IllegalArgumentException("Email da duoc dang ky");
        }
        User u = new User();
        u.setEmail(r.email());
        u.setPasswordHash(encoder.encode(r.password()));
        u.setFullName(r.fullName());
        u.setRole("USER");
        u.setPreferredLanguage(r.preferredLanguage() == null ? "vi" : r.preferredLanguage());
        u.setCreatedAt(LocalDateTime.now());
        return toResponse(users.save(u));
    }

    public AuthResponse login(LoginRequest r) {
        User u = users.findByEmail(r.email()).orElseThrow(() -> new BadCredentialsException("Sai email hoac mat khau"));
        if (!encoder.matches(r.password(), u.getPasswordHash())) {
            throw new BadCredentialsException("Sai email hoac mat khau");
        }
        return toResponse(u);
    }

    public UserInfo me(String email) {
        return info(find(email));
    }

    public UserInfo updateProfile(String email, UpdateProfileRequest r) {
        User u = find(email);
        u.setFullName(r.fullName());
        if (r.preferredLanguage() != null) {
            u.setPreferredLanguage(r.preferredLanguage());
        }
        return info(users.save(u));
    }

    private User find(String email) {
        return users.findByEmail(email).orElseThrow(() -> new NotFoundException("Khong tim thay nguoi dung"));
    }

    private AuthResponse toResponse(User u) {
        return new AuthResponse(jwt.generate(u.getEmail(), u.getRole()), info(u));
    }

    private UserInfo info(User u) {
        return new UserInfo(u.getId(), u.getEmail(), u.getFullName(), u.getRole(), u.getPreferredLanguage());
    }
}
