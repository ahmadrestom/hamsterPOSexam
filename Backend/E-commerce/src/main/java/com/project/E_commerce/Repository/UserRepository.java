package com.project.E_commerce.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.E_commerce.models.user;

@Repository
public interface UserRepository extends JpaRepository<user, Integer>{
	
	boolean existsByEmail(String email);
	
	Optional<user> findByEmail(String email);

}
