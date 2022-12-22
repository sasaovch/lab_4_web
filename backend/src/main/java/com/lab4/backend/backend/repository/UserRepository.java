package com.lab4.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lab4.backend.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    public User findByLogin(String login);
    public User findByJwtToken(String jwtToken);
}
