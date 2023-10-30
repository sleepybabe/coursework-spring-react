package ru.isu.project.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.project.model.ErrorPage;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ErrorController {
    
    @RequestMapping("/errors")
    public ResponseEntity<ErrorPage> showError() {
        ErrorPage error = new ErrorPage("По указанному адресу ничего не найдено");
        return ResponseEntity.ok(error);
    }
}
