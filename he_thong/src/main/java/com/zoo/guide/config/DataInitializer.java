package com.zoo.guide.config;

import com.zoo.guide.entity.Language;
import com.zoo.guide.entity.User;
import com.zoo.guide.repository.LanguageRepository;
import com.zoo.guide.repository.UserRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository users;
    private final LanguageRepository languages;
    private final PasswordEncoder encoder;
    private final String adminEmail;
    private final String adminPassword;

    public DataInitializer(UserRepository users, LanguageRepository languages, PasswordEncoder encoder,
                           @Value("${app.admin.email}") String adminEmail,
                           @Value("${app.admin.password}") String adminPassword) {
        this.users = users;
        this.languages = languages;
        this.encoder = encoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        if (!users.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPasswordHash(encoder.encode(adminPassword));
            admin.setFullName("Administrator");
            admin.setRole("ADMIN");
            admin.setCreatedAt(LocalDateTime.now());
            users.save(admin);
        }
        seedLanguage("vi", "Tieng Viet");
        seedLanguage("en", "English");
    }

    private void seedLanguage(String code, String name) {
        if (languages.findByCode(code).isEmpty()) {
            Language l = new Language();
            l.setCode(code);
            l.setName(name);
            l.setActive(true);
            languages.save(l);
        }
    }
}
