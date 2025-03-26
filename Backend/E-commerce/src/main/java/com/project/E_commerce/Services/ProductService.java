package com.project.E_commerce.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.E_commerce.DTO.GetProductsDTO;
import com.project.E_commerce.Repository.ProductRepository;
import com.project.E_commerce.models.Product;

@Service
public class ProductService {
	
	@Autowired
    private ProductRepository productRepository;
	
	public List<GetProductsDTO> getAllProducts() {
        List<Product> products =  productRepository.findAll();
        List<GetProductsDTO> productDTOs = new ArrayList<>();
        for(Product product: products){
        	GetProductsDTO productDTO = GetProductsDTO.builder()
        			.title(product.getTitle())
        			.description(product.getDescription())
        			.price(product.getPrice())
        			.category(product.getCategory().getTitle())
        			.build();
        	
        	productDTOs.add(productDTO);
        }
        return productDTOs;
    }
	
	public Product createProduct(Product product) {
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
