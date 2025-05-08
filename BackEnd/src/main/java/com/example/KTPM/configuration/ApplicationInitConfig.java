package com.example.KTPM.configuration;

import com.example.KTPM.entity.Role;
import com.example.KTPM.entity.User;
import com.example.KTPM.enums.Roles;
import com.example.KTPM.repository.RoleRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
@Builder
@Configuration
@Slf4j
@RequiredArgsConstructor

public class ApplicationInitConfig {
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if(userRepository.findByName("admin").isEmpty()) {
                PasswordEncoder pwdEncoder=new BCryptPasswordEncoder(10);
                HashSet<Role> roles=new HashSet<>();
                roleRepository.findById(Roles.ADMIN.name()).ifPresent(roles::add);
                User user=User.builder()
                        .name("admin")
                        .password(pwdEncoder.encode("admin"))
                        .email("admin@admin.com")
                        .role(roles)
                        .build();
            userRepository.save(user);
            log.warn("User admin has been added with default password:admin,please change it");
            }
        };

    }
}
