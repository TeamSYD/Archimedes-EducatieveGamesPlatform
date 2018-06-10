package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Scoreboard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreboardRepository extends JpaRepository<Scoreboard, Long> {
    Page<Scoreboard> findBySessionId(long sessionId, Pageable pageable);
}