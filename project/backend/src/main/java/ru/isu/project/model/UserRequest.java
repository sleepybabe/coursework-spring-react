
package ru.isu.project.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRequest {
    
    private String name;
    private String username;
    private String phone;
    private String password;
    private String address;
    private String role;
    
}
