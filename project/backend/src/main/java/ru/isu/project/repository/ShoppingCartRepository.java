package ru.isu.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.isu.project.model.Product;
import ru.isu.project.model.ShoppingCart;

@Repository
@CrossOrigin(origins = "*")
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    @Query("SELECT sc FROM ShoppingCart AS sc WHERE sc.user.id=:user_id")
    ShoppingCart findShoppingCartByUserId(@Param("user_id") Long user_id);
    
    @Query("SELECT sc.products FROM ShoppingCart sc WHERE sc.id=:id")
    List<Product> findProductsByShoppingCartId(@Param("id") Long id);
    
    
}
