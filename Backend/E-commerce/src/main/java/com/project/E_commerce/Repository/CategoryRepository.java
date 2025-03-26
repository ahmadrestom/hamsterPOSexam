package com.project.E_commerce.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.E_commerce.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	Optional<Category> findByTitle(String name); 
}
