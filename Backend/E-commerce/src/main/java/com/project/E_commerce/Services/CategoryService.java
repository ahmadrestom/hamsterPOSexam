package com.project.E_commerce.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.E_commerce.DTO.GetCategoryDTO;
import com.project.E_commerce.Repository.CategoryRepository;
import com.project.E_commerce.models.Category;

@Service
public class CategoryService {
	
	@Autowired
    private CategoryRepository categoryRepository;
	
	public List<GetCategoryDTO> getAllCategories() {
        List<Category> categories =  categoryRepository.findAll();
        List<GetCategoryDTO> cDTOs = new ArrayList<>();
        for(Category category:categories) {
        	GetCategoryDTO dto = GetCategoryDTO.builder()
        			.category_id(category.getCategory_id())
        			.title(category.getTitle())
        			.description(category.getDescription())
        			.build();
        	cDTOs.add(dto);
        }
        return cDTOs;
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
