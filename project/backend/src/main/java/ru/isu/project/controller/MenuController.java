
package ru.isu.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.project.model.Menu;

import ru.isu.project.model.Product;
import ru.isu.project.service.MenuService;
import ru.isu.project.service.ProductService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class MenuController {
    
    @Autowired
    private MenuService menuService;
    
    @Autowired
    private ProductService productService;
    
    @GetMapping("/menu")
    public ResponseEntity<Menu> findMenu(){
        Menu menu = menuService.findMenu();
        if(menu == null)
            return ResponseEntity.ok(new Menu());
        List<Product> products = menuService.findProductsByMenuId(menu.getId());
        menu.setProducts(products);
        return ResponseEntity.ok(menu);
    }
    
    @PostMapping("/menu/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Product product){
        
        Menu menu = menuService.findById(id).orElse(null);
        if (menu == null) {
            return ResponseEntity.notFound().build();
        }
        List<Product> products = menuService.findProductsByMenuId(menu.getId());
        products.add(product);
        menu.setProducts(products);
        menuService.save(menu);
        return ResponseEntity.ok(menu);
    }
    
    @Modifying
    @DeleteMapping("/menu/{menuId}/product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long menuId, @PathVariable Long productId) {
        Menu menu = menuService.findById(menuId).orElse(null);
        Product product = productService.findProductById(productId);
        List<Product> products = menuService.findProductsByMenuId(menuId);
        int prId = products.indexOf(product); 
        products.remove(prId);
        menu.setProducts(products);
        menuService.save(menu);

        return ResponseEntity.ok().build();
    }
    
}
