package ru.isu.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.isu.project.model.Product;


@Repository
@CrossOrigin(origins = "*")
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("Select p FROM Product as p")
    public List<Product> findAllProducts();
    
    @Query("SELECT p FROM Product as p where p.id = :id")
    public Product findProductById(@Param("id") Long id);
    
    @Query("SELECT p FROM Product AS p WHERE p.id NOT IN(SELECT products.id FROM Menu m JOIN m.products as products)")
    public List<Product> findProductsNotInMenu();


}
