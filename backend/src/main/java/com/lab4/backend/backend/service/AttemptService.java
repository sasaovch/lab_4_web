package com.lab4.backend.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lab4.backend.backend.model.Attempt;
import com.lab4.backend.backend.model.AttemptDTO;
import com.lab4.backend.backend.model.User;
import com.lab4.backend.backend.repository.AttemptRepository;

@Service
public class AttemptService {
    private AttemptRepository repository;

    private UserService userService;
    
    @Autowired
    public AttemptService(AttemptRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public Attempt createAttempt(AttemptDTO attemptDTO) {
        User user = userService.getUserByToken(attemptDTO.getJwtToken());
        if (user == null) {
            return null;
        } else {
            Attempt attempt = attemptDTO.getAttempt();
            attempt.setUser(user);
            attempt.setDate(new Date());
            attempt.setHit(checkHit(attempt));
            repository.save(attempt);
            return attempt;
        }
    }

    public List<Attempt> getAllAttempts(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return user.getAttempts();
        }
    }

    @Transactional
    public boolean deleteAllAttempts(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return false;
        } else {
            for (Attempt attempt : user.getAttempts()) {
                repository.deleteAllByUser(attempt.getUser());
            }
            user.getAttempts().clear();
            userService.updateUser(user);
            return true;
        }
    }

    public Page<Attempt> findAll(String jwtToken, Pageable pageable) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return repository.findAllByUser(user, pageable);
        }
    }

    public Integer getNumberOfAllAttemtps(String jwtToken) {
        User user = userService.getUserByToken(jwtToken.substring(8, jwtToken.length() - 1));
        if (user == null) {
            return null;
        } else {
            return user.getAttempts().size();
        }
    }

    private boolean checkHit(Attempt attempt) {
        return checkRectangle(attempt.getX(), attempt.getY(), attempt.getR()) ||
                checkTriangle(attempt.getX(), attempt.getY(), attempt.getR()) ||
                checkCircle(attempt.getX(), attempt.getY(), attempt.getR());
    }
    
    private boolean checkRectangle(float x, float y, float r) {
        return x >= 0 && y >= 0 && (2 * x) <= r && y <= r;
    }

    private boolean checkTriangle(float x, float y, float r) {
        return x <= 0 && y <= 0 && (2*y) >= -x - r;
    }

    private boolean checkCircle(float x, float y, float r) {
        return x <= 0 && y >= 0 && x*x+y*y <= r*r/4;
    }
}
