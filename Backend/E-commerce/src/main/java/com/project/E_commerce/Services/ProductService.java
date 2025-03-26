package com.project.E_commerce.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.E_commerce.DTO.GetProductsDTO;
import com.project.E_commerce.Repository.CategoryRepository;
import com.project.E_commerce.Repository.ProductRepository;
import com.project.E_commerce.models.Category;
import com.project.E_commerce.models.Product;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
	
	@Autowired
    private ProductRepository productRepository;
	@Autowired
    private CategoryRepository categoryRepository;
	
	public List<GetProductsDTO> getAllProducts() {
        List<Product> products =  productRepository.findAll();
        List<GetProductsDTO> productDTOs = new ArrayList<>();
        for(Product product: products){
        	GetProductsDTO productDTO = GetProductsDTO.builder()
        			.id(product.getProduct_id())
        			.title(product.getTitle())
        			.description(product.getDescription())
        			.price(product.getPrice())
        			.category(product.getCategory().getTitle())
        			.build();
        	
        	productDTOs.add(productDTO);
        }
        return productDTOs;
    }
	
	@Transactional
    public Product createProduct(Product product) {
        Category category = product.getCategory();

        if (category != null) {
            
            Optional<Category> existingCategory = categoryRepository.findByTitle(category.getTitle());

            if (existingCategory.isPresent()) {
                product.setCategory(existingCategory.get());
            } else {
                categoryRepository.save(category);
                product.setCategory(category);
            }
        }

        return productRepository.save(product);
    }
	
	public Product updateProduct(Integer id, Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setTitle(productDetails.getTitle());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        return productRepository.save(product);
    }
	
	public void deleteProduct(Integer id){
        productRepository.deleteById(id);
    }
	
	

}
