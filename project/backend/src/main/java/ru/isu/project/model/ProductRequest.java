
package ru.isu.project.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductRequest {
    
    private String name;
    private Double price;
    private String description;
    
}
