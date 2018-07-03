package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Memory;
import com.restservice.archimedes.model.Puzzle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuzzleRepository extends JpaRepository<Puzzle, Long> {
    Puzzle findByRuleId(long ruleId);
}
