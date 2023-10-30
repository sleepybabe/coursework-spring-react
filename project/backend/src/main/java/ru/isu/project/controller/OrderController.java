
package ru.isu.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.project.model.MessageResponse;

import ru.isu.project.model.OrderRequest;
import ru.isu.project.model.Product;

import ru.isu.project.model.UserOrder;
import ru.isu.project.service.AutoUserService;
import ru.isu.project.service.OrderService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private AutoUserService userService;
    
    @GetMapping("/ordersByStatus/{status}")
    public ResponseEntity<List<UserOrder>> findOrdersByStatus(@PathVariable("status") String status){
        List<UserOrder> orders = orderService.findOrdersByStatus(status);
        for (UserOrder order : orders) {
            List<Product> products = orderService.findProductsByOrderId(order.getId());
            order.setProducts(products);
        }
        return ResponseEntity.ok(orders);
    }
    
    @PostMapping("/changeOrderStatus/{status}")
    public ResponseEntity<UserOrder> changeOrderStatus(@PathVariable("status") String status,@RequestBody  UserOrder or){
        or.setStatus(status);
        orderService.save(or);
        return ResponseEntity.ok(or);
    }
    
    @GetMapping("/orders/user/{id}")
    public ResponseEntity<List<UserOrder>> findOrdersByUserId(@PathVariable("id") Long id){
        List<UserOrder> orders = orderService.findOrdersByUserId(id);
        for (UserOrder order : orders) {
            List<Product> products = orderService.findProductsByOrderId(order.getId());
            order.setProducts(products);
        }
        return ResponseEntity.ok(orders);
    }
    
    @PostMapping("/addOrder")
    public ResponseEntity<UserOrder> addOrder(@RequestBody  OrderRequest or){
        UserOrder order = new UserOrder();
        order.setProducts(or.getProducts());
        order.setPrice(or.getPrice());
        order.setAddress(or.getAddress());
        order.setStatus("COOK");
        order.setUser(userService.findUserById(or.getUserId()));
        orderService.save(order);
        return ResponseEntity.ok(order);
    }
    
    
    @GetMapping("/orders/{id}")
    public ResponseEntity<UserOrder> findOrderById(@PathVariable("id") Long id){
        UserOrder order = orderService.findOrderById(id);
        List<Product> products = orderService.findProductsByOrderId(id);
        order.setProducts(products);
        return ResponseEntity.ok(order);
    }
    
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id){
        orderService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Заказ успешно удален"));
    }
    
    
}
