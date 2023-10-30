package ru.isu.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.isu.project.model.AutoUser;


@Repository
@CrossOrigin(origins = "*")
public interface AutoUserRepository extends JpaRepository<AutoUser, Long> {

    public AutoUser findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    boolean existsByRole(String role);
    
    @Query("Select u FROM AutoUser u")
    public List<AutoUser> findAllUsers();


    @Query("SELECT u FROM AutoUser as u where u.id = :id")
    public AutoUser findUserById(@Param("id") Long id);
}
