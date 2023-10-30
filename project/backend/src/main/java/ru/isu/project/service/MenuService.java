package ru.isu.project.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.project.model.Menu;
import ru.isu.project.model.Product;

import ru.isu.project.repository.MenuRepository;


@Service
public class MenuService {
    
    @Autowired
    private MenuRepository menuRepository;
    
    public Menu findMenu(){
        return menuRepository.findMenu();
    }
    
    public List<Product> findProductsByMenuId(Long id){
        return menuRepository.findProductsByMenuId(id);
    }
    
    
    public Optional<Menu> findById(Long id){
        return menuRepository.findById(id);
    }
 
    public Menu save(Menu menu){
        return menuRepository.save(menu);
    }
    
}
