package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Category;
import com.restservice.archimedes.model.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Page<Game> findByAccountId(long accountId, Pageable pageable);
    Page<Game> findByArrangementId(long ArrangementId, Pageable pageable);

}