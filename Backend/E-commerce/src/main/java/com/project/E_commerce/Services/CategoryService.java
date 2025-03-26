package com.project.E_commerce.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.E_commerce.Repository.CategoryRepository;
import com.project.E_commerce.models.Category;

@Service
public class CategoryService {
	
	@Autowired
    private CategoryRepository categoryRepository;
	
	public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
	
	public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
	
	public Category updateCategory(Integer id, Category categoryDetails) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setTitle(categoryDetails.getTitle());
        category.setDescription(categoryDetails.getDescription());
        return categoryRepository.save(category);
    }
	
	public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }

}
