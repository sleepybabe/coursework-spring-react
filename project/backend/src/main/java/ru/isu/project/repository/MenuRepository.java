package ru.isu.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.isu.project.model.Menu;
import ru.isu.project.model.Product;


@Repository
@CrossOrigin(origins = "*")
public interface MenuRepository extends JpaRepository<Menu, Long> {
    
    @Query("SELECT m.products FROM Menu m WHERE m.id=:id")
    List<Product> findProductsByMenuId(@Param("id") Long id);
    
    @Query("SELECT m FROM Menu as m")
    public Menu findMenu();
}
