
package ru.isu.project.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ErrorPage {
    
    private String response;
    public ErrorPage(String response){
        this.response = response;
    }
}
