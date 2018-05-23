package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Arrangement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArrangementRepository extends JpaRepository<Arrangement, Long> {

}