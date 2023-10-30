
package ru.isu.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.project.model.AutoUser;
import ru.isu.project.model.MessageResponse;
import ru.isu.project.model.UserRequest;
import ru.isu.project.model.UserUpdateRequest;
import ru.isu.project.service.AutoUserService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class AutoUserController {
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    private AutoUserService userService;
    
    @GetMapping("/users")
    public ResponseEntity<List<AutoUser>> findAllUsers(){
        return ResponseEntity.ok(userService.findAllUsers());
    }
    
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody UserRequest user){ 
        AutoUser newuser = new AutoUser();
        newuser.setAddress(user.getAddress());
        newuser.setName(user.getName());
        newuser.setPhone(user.getPhone());
        newuser.setRole(user.getRole());
        newuser.setUsername(user.getUsername());
        newuser.setPassword(encoder.encode(user.getPassword()));
        userService.save(newuser);
        return ResponseEntity.ok(new MessageResponse("Пользователь успешно добавлен"));
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<AutoUser> findUserById(@PathVariable("id") Long id){
        return ResponseEntity.ok(userService.findUserById(id));
    }
    
    @PostMapping("/users/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable("id") Long id, @RequestBody UserUpdateRequest userReq){
        AutoUser user = userService.findUserById(id);
        user.setAddress(userReq.getAddress());
        user.setName(userReq.getName());
        user.setPhone(userReq.getPhone());
        user.setUsername(userReq.getUsername());
        userService.save(user);
        return ResponseEntity.ok(new MessageResponse("Пользователь успешно обновлен"));
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id){
        userService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Пользователь успешно удален"));
    }
    
}
