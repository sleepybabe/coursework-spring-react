
package ru.isu.project.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserUpdateRequest {
    
    private String name;
    private String address;
    private String username;
    private String phone;
    
}
