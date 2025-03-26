package com.project.E_commerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.E_commerce.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
