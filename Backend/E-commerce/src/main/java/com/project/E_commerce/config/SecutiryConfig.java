package com.project.E_commerce.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecutiryConfig {
	
	 private final JwtAuthenticationFilter jwtAuthFilter;
	    private final AuthenticationProvider authenticationProvider;

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
	            .csrf(csrf -> csrf.disable())
	            .authorizeHttpRequests(authorize -> authorize
	                .requestMatchers("/api/v1/auth/**").permitAll()  // Explicit auth endpoints
	                .requestMatchers("/api/v1/**").permitAll()
	                .requestMatchers("/api/v2/**").authenticated()
	                .anyRequest().permitAll())
	            .headers(headers -> headers
	                .frameOptions().sameOrigin())
	            .sessionManagement(management -> management
	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authenticationProvider(authenticationProvider)
	            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
	        
	        return http.build();
	    }

	    @Bean
	    CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
	        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
	        configuration.setAllowedHeaders(Arrays.asList("*"));
	        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Disposition")); // Expose custom headers
	        configuration.setAllowCredentials(true);
	        configuration.setMaxAge(3600L); // 1 hour cache for preflight
	        
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }
	}