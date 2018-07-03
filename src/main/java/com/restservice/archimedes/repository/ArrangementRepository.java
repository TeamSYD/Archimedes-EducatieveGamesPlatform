package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Arrangement;
import com.restservice.archimedes.model.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArrangementRepository extends JpaRepository<Arrangement, Long> {
    Page<Arrangement> findByAccountId(long accountId, Pageable pageable);

}