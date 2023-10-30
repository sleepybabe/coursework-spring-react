package ru.isu.project.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.project.model.Product;

import ru.isu.project.model.UserOrder;
import ru.isu.project.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public List<UserOrder> findAll(){
        return orderRepository.findAll();
    }
    
    public List<Product> findProductsByOrderId(Long id){
        return orderRepository.findProductsByOrderId(id);
    }
    
    public List<UserOrder> findOrdersByStatus(String status){
        return orderRepository.findOrdersByStatus(status);
    }
    
     public List<UserOrder> findOrdersByUserId(Long id){
        return orderRepository.findOrdersByUserId(id);
    }
    
    
    public UserOrder findOrderById(Long id){
        return orderRepository.findOrderById(id);
    }
 
    public void deleteById(Long id){
        orderRepository.deleteById(id); 
    }
    
    public UserOrder save(UserOrder order){
        return orderRepository.save(order);
    }
    
}
