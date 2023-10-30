package ru.isu.project.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HomeController {
    @GetMapping("/")
    public String startPage() {
        return "Start page";
    }

}
