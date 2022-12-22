package com.lab4.backend.backend.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lab4.backend.backend.model.TokenDTO;
import com.lab4.backend.backend.model.User;
import com.lab4.backend.backend.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtUtil jwtTokenRepository;
    
    public TokenDTO login(User user) {
        User u = repository.findByLogin(user.getLogin());
        if (Objects.isNull(user.getLogin()) || Objects.isNull(user.getPassword())) {
            return new TokenDTO(400, "Incorrect login or password", "");
        } else if (u == null) {
            return new TokenDTO(400, "User not found", "");
        } else if (!u.getPassword().equals(user.getPassword())) {
            return new TokenDTO(400, "Wrong password", "");
        }
        return new TokenDTO(200, "Login completed successfully", u.getJwtToken());
    }

    public TokenDTO register(User user) {
        if (Objects.isNull(user.getLogin()) || Objects.isNull(user.getPassword())) {
            return new TokenDTO(400, "Incorrect login or password", "");
        } else if (repository.findByLogin(user.getLogin()) != null) {
            return new TokenDTO(400, "Login is already used", "");
        }
        user.setJwtToken(jwtTokenRepository.generateToken(user));
        repository.save(user);
        return new TokenDTO(200, "Registration completed successfully", user.getJwtToken());
    }

    public TokenDTO checkToken(String token) {
        if (!Objects.isNull(token) && repository.findByJwtToken(token) != null) {
            return new TokenDTO(200, "Token is valid", token);
        } else {
            return new TokenDTO(404, "Token is invalid", "");
        }
    }

    public User getUserByToken(String token) {
        if (!Objects.isNull(token)) {
            return repository.findByJwtToken(token);
        } else {
            return null;
        }
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

}
