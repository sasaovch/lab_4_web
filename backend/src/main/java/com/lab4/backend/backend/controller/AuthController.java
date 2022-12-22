package com.lab4.backend.backend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.lab4.backend.backend.model.TokenDTO;
import com.lab4.backend.backend.model.User;
import com.lab4.backend.backend.service.UserService;

@RestController
@RequestMapping("/")
public class AuthController {

    private UserService service;

    private Gson gson = new Gson();

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public String loginUser(@RequestBody String userJson) {
        TokenDTO jwtToke = service.login(gson.fromJson(userJson, User.class));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin","*"); 
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Content-Type", "application/json");
        return gson.toJson(jwtToke);
    }

    @PostMapping(path = "/register")
    @CrossOrigin
    public String registerUser(@RequestBody String userJson) {
        TokenDTO jwtToke = service.register(gson.fromJson(userJson, User.class));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin","*"); 
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Content-Type", "application/json");
        return gson.toJson(jwtToke);
    }

    @GetMapping(path = "/check-token")
    @CrossOrigin
    public String checkToken(@RequestParam("token") String token) {
        TokenDTO jwtToke = service.checkToken(gson.fromJson(token, String.class));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin","*"); 
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Content-Type", "application/json");
        return gson.toJson(jwtToke);
    }
}