package ru.isu.project.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductResponse {

    private Product product;
    private String file;

    
    public ProductResponse(){        
    }
    
    public ProductResponse(Product product, String file) {
        this.product = product;
        this.file = file;
    }

}
