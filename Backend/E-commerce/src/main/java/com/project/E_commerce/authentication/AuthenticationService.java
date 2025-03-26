package com.project.E_commerce.authentication;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.project.E_commerce.Repository.UserRepository;
import com.project.E_commerce.config.JwtService;
import com.project.E_commerce.models.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	@Value("${admin.code}")
	private String adminCode;
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	
	public AuthenticationResponse register(RegisterRequest request) {
		if (repository.existsByEmail(request.getEmail())){
	        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
	    }
		
		String role = "customer";
		if(request.getAdminCode() != null && request.getAdminCode().equals(adminCode))
		
		{
			role = "admin";
		}
		var userr = User.builder()
				.name(request.getUserName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(role)
				.build();
		repository.save(userr);
		
		var jwtToken = jwtService.generateToken(userr);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
				)
		);
		var user = repository.findByEmail(request.getEmail())
				.orElseThrow();
		
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.name(user.getUsername())
				.id(user.getId())
				.role(user.getRole())
				.build();
	}	
	
}
