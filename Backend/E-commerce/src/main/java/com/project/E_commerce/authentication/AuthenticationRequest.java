package com.project.E_commerce.authentication;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationRequest {
	
	private String email;
	private String password;
}
