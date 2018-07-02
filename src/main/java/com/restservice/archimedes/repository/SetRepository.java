package com.restservice.archimedes.repository;


import com.restservice.archimedes.model.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetRepository extends JpaRepository<Set, Long> {
    Page<Set> findByGameId(long gameId, Pageable pageable);

}