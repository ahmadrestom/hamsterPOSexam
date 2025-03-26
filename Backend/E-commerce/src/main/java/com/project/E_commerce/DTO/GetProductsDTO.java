package com.project.E_commerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetProductsDTO {
	
	private Integer id;
	private String title;
	private String description;
	private double price;
	private String category;
	
	

}
