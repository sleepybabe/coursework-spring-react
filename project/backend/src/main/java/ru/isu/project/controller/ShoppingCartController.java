
package ru.isu.project.controller;

import java.util.ArrayList;
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

import ru.isu.project.model.Product;

import ru.isu.project.model.ShoppingCart;
import ru.isu.project.service.ProductService;
import ru.isu.project.service.ShoppingCartService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ShoppingCartController {
    
    @Autowired
    private ShoppingCartService shoppingCartService;
    
    @Autowired
    private ProductService productService;
    
    @GetMapping("/shoppingCart/{id}")
    public ResponseEntity<ShoppingCart> findShoppingCartByUserId(@PathVariable Long id){
        ShoppingCart shoppingCart = shoppingCartService.findShoppingCartByUserId(id);
        List<Product> products = shoppingCartService.findProductsByShoppingCartId(shoppingCart.getId());
        shoppingCart.setProducts(products);
        return ResponseEntity.ok(shoppingCart);
    }
    
    @PostMapping("/shoppingCart/{id}")
    public ResponseEntity<ShoppingCart> updateShoppingCart(@PathVariable Long id, @RequestBody Product product){
        ShoppingCart shoppingCart = shoppingCartService.findShoppingCartByUserId(id);
        if (shoppingCart == null) {
            return ResponseEntity.notFound().build();
        }
        List<Product> products = shoppingCartService.findProductsByShoppingCartId(shoppingCart.getId());
        products.add(product);
        shoppingCart.setProducts(products);
        shoppingCartService.save(shoppingCart);
        return ResponseEntity.ok(shoppingCart);
    }
    
    @Modifying
    @DeleteMapping("/shoppingCart/{scId}/product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long scId, @PathVariable Long productId) {
        ShoppingCart shoppingCart = shoppingCartService.findById(scId).orElse(null);
        if (shoppingCart == null) {
            return ResponseEntity.notFound().build();
        }
        Product product = productService.findProductById(productId);

        List<Product> products = shoppingCartService.findProductsByShoppingCartId(scId);
        int prId = products.indexOf(product); 
        products.remove(prId);
        shoppingCart.setProducts(products);
        shoppingCartService.save(shoppingCart);
        return ResponseEntity.ok().build();
    }
    
    @Modifying
    @DeleteMapping("/clearShoppingCart/{id}")
    public ResponseEntity<?> clearById(@PathVariable("id") Long id){
        ShoppingCart shoppingCart = shoppingCartService.findById(id).orElse(null);
        if (shoppingCart == null) {
            return ResponseEntity.notFound().build();
        }
        shoppingCart.setProducts(new ArrayList<>());
        shoppingCartService.save(shoppingCart);
        return ResponseEntity.ok().build();
    }
    
}
