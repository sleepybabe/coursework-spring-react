package ru.isu.project.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.project.model.AutoUser;
import ru.isu.project.repository.AutoUserRepository;

@Service
public class AutoUserService {
    
    @Autowired
    private AutoUserRepository userRepository;
    
    public List<AutoUser> findAllUsers(){
        return userRepository.findAllUsers();
    }
    
    public AutoUser findUserById(Long id){
        return userRepository.findUserById(id);
    }
    
    
    public void deleteById(Long id){
        userRepository.deleteById(id); 
    }
    
    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }
    
    public AutoUser save(AutoUser user){
        return userRepository.save(user);
    }
    
}
