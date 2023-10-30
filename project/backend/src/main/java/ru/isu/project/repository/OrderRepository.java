package ru.isu.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.isu.project.model.UserOrder;
import ru.isu.project.model.Product;


@Repository
@CrossOrigin(origins = "*")
public interface OrderRepository extends JpaRepository<UserOrder, Long> {
    
    
    @Query("SELECT o.products FROM UserOrder o WHERE o.id=:id")
    List<Product> findProductsByOrderId(@Param("id") Long id);
    
    @Query("SELECT o FROM UserOrder o WHERE o.user.id=:userId")
    List<UserOrder> findOrdersByUserId(@Param("userId") Long userId);
    
    @Query("SELECT o FROM UserOrder o WHERE o.status = :status")
    List<UserOrder> findOrdersByStatus(@Param("status") String status);
    
    @Query("SELECT o FROM UserOrder as o where o.id = :id")
    public UserOrder findOrderById(@Param("id") Long id);

}
