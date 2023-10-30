package ru.isu.project.service;

import ru.isu.project.repository.ShoppingCartRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.project.model.Product;
import ru.isu.project.model.ShoppingCart;
import ru.isu.project.repository.AutoUserRepository;

@Service
public class ShoppingCartService {
    
    @Autowired
    private  ShoppingCartRepository shoppingCartRepository;
    
    @Autowired
    private  AutoUserRepository userRepository;
    
    public ShoppingCart findShoppingCartByUserId(Long id){
        ShoppingCart sc = shoppingCartRepository.findShoppingCartByUserId(id);
        if (sc == null){
            ShoppingCart newsc = new ShoppingCart();
            newsc.setUser(userRepository.findUserById(id));
            shoppingCartRepository.save(newsc);
            return newsc;
        }
        return sc;
    }
    
    public List<Product> findProductsByShoppingCartId(Long id){
        return shoppingCartRepository.findProductsByShoppingCartId(id);
    }
    
    
    public ShoppingCart save(ShoppingCart shoppingCart){
        return shoppingCartRepository.save(shoppingCart);
    }
    
    public void deleteById(Long id){
        shoppingCartRepository.deleteById(id); 
    }
    
    public Optional<ShoppingCart> findById(Long id){
        return shoppingCartRepository.findById(id);
    }
    
    
}
