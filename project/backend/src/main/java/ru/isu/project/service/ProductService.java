package ru.isu.project.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.project.model.Product;
import ru.isu.project.repository.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> findAllProducts(){
        return productRepository.findAllProducts();
    }
    
    public List<Product> findProductsNotInMenu(){
        return productRepository.findProductsNotInMenu();
    }
    
    public Product findProductById(Long id){
        return productRepository.findProductById(id);
    }
    
    public void deleteById(Long id){
        productRepository.deleteById(id); 
    }
    
    public Product save(Product product){
        return productRepository.save(product);
    }

    public Optional<Product> findById(Long productId) {
        return productRepository.findById(productId);
    }
    
}
