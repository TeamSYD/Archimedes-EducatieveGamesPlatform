package com.restservice.archimedes.repository;


import com.restservice.archimedes.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findByAccountId(long accountId, Pageable pageable);
    Category findByName(String name);

}