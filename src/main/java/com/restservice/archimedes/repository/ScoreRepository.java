package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Score;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Page<Score> findByScoreboardId(Long scoreboardId, Pageable pageable);
}