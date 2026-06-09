package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.UserSession;

public interface SessionRepository
        extends JpaRepository<UserSession, Long> {

    Optional<UserSession>
        findByToken(String token);

    void deleteByToken(
            String token);
}