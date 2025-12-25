package com.anik.ecommerce.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.time.Instant;
import java.util.Date;

public class JwtUtil {

    // 🔐 TEMP secret (we'll move to config later)
    private static final String SECRET =
            "THIS_IS_A_VERY_LONG_SECRET_KEY_FOR_JWT_SHOULD_BE_AT_LEAST_256_BITS";

    private static final long EXPIRATION_MS = 15 * 60 * 1000; // 15 minutes

    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String generateToken(String userId, String email, String role) {

        return Jwts.builder()
                .subject(userId)
                .claim("email", email)
                .claim("role", role)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(EXPIRATION_MS)))
                .signWith(key)
                .compact();
    }
}
