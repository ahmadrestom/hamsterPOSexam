package com.project.E_commerce.authentication;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
	
	private final AuthenticationService service;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody RegisterRequest request
	){
		System.out.println(request.getAdminCode() +" xxx");
		return ResponseEntity.ok(service.register(request));
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
	){
		return ResponseEntity.ok(service.authenticate(request));
	}
}
