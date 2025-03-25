package com.project.E_commerce.authentication;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RegisterRequest{
	
	private String userName;
	private String email;
	private String password;
}
