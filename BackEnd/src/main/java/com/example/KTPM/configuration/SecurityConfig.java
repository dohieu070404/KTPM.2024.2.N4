package com.example.KTPM.configuration;

import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Data
public class SecurityConfig {
    private CustomJwtDecoder jwtDecoder;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(requests ->
                requests
                        .requestMatchers(HttpMethod.POST, "/auth/log-in","/auth/log-out","/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.POST,"/users").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/users").permitAll()
//                        .requestMatchers(HttpMethod.POST,"/auth").permitAll()

                        //phân quyền theo end point
                        //.requestMatchers(HttpMethod.GET,"/users").hasAnyAuthority("SCOPE_ADMIN")//mặc định sẽ gắn tiền tố SCOPE_ trước tên role
                            //.hasRole(Roles.ADMIN.name())
                        .anyRequest().authenticated());
       //tạo ProviderManager Khi có một yêu cầu xác thực (Authentication), ProviderManager sẽ duyệt qua danh sách các AuthenticationProvider mà nó quản lý.
        httpSecurity.oauth2ResourceServer(oauth2->
                oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder))
                        //authenticationEntryPoint() là điểm mà khi authentication fail thì sẽ điều hướng user đi đâu
                        //authenticationEntryPoint() cần giá trị nạp vào là 1 AuthenticationEntryPoint nên cần tạo 1 class implement AuthenticationEntryPoint
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())

        );
        httpSecurity.csrf(AbstractHttpConfigurer::disable); 
        return httpSecurity.build();
    }

}
