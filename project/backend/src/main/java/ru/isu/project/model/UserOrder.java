package ru.isu.project.model;


import java.util.List;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_order")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserOrder {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;
    
    @ManyToMany
    @JoinTable(
        name = "order_product",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;
   
    
    @Column(name = "status")
    private String status;

    @Column(name = "address")
    private String address;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AutoUser user;
    
    public void setSumPrice(){
        Double tmpPrice = 0.0;
        for (Product product : this.products) {
            tmpPrice += product.getPrice();
        }
        this.price = tmpPrice;
    }
    
}
