package com.project.E_commerce.DTO;

import com.project.E_commerce.models.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostProductDTO {
	
	private String title;
	private String description;
	private double price;
	private Category category;

}
