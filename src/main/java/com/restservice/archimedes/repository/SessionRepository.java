package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    Session findByPin(int pin);
    Page<Session> findByGameId(long gameId, Pageable pageable);
}