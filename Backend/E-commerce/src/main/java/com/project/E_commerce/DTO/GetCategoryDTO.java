package com.project.E_commerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCategoryDTO {
	
	private Integer category_id;
	private String title;
	private String description;

}
