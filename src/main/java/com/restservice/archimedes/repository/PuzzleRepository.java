package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Puzzle;
import com.restservice.archimedes.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuzzleRepository extends JpaRepository<Puzzle, Long> {

}
