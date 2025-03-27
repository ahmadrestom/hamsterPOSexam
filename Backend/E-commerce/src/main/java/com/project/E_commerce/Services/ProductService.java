package com.project.E_commerce.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.E_commerce.DTO.GetProductsDTO;
import com.project.E_commerce.DTO.PostProductDTO;
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
	public Product createProduct(PostProductDTO productDTO) {
		System.out.println("Incoming DTO: " + productDTO); 
	    System.out.println("Category: " + productDTO.getCategory());
	    if (productDTO.getCategory() != null && productDTO.getCategory() != null) {
	       Optional<Category> existingCategory = categoryRepository.findById(productDTO.getCategory().getCategory_id());
	       if (existingCategory.isPresent()) {
	            Product product = new Product();
	            product.setTitle(productDTO.getTitle());
	            product.setDescription(productDTO.getDescription());
	            product.setPrice(productDTO.getPrice());
	            product.setCategory(existingCategory.get());
	            return productRepository.save(product);
	        } else {
	            
	            throw new RuntimeException("Category not found");
	        }
	    } else {
	        throw new RuntimeException("Category is required");
	    }
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
