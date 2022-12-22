package com.lab4.backend.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.lab4.backend.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {

private String SECRET_KEY = "secretioioioioioioioiiiiiiiiiiiiiiiiiiiiiiiiiiiiiioooooooooooooooooooooookljdslkfjlskdjflksdjflksdjflkdsjfklsjdklfjskldfjklsdjfklsdjfklsjdlkfjooo";

public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
}

public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
}

public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
}

public Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
}

public Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
}

public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("login", user.getLogin());
    claims.put("password", user.getPassword());
    return createToken(claims, user.getLogin());
}

public String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
}

public Boolean validateToken(String token) {
    try {
        token = token.substring(1, token.length() - 1);
        try {
            return (!isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    } catch (StringIndexOutOfBoundsException e) {
        return false;
    }
}
}