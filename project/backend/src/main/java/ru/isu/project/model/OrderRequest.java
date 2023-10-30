
package ru.isu.project.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderRequest {
    
    private List<Product> products;
    private Double price;
    private String address;
    private Long userId;
    
}
