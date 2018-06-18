package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Resource;
import org.hibernate.annotations.Where;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    //Get by Category_id
    Page<Resource> findByCategoryId(long categoryId, Pageable pageable);

    //Get Images
    @Query("SELECT r FROM Resource r WHERE category_id = :x and image_data IS NOT NULL AND text_resource IS NULL")
    Page<Resource> findImagesByCategoryId(@Param("x") long categoryId, Pageable pageable);

    //Get Texts
    @Query("SELECT r FROM Resource r WHERE category_id = :x and image_data IS NULL AND text_resource IS NOT NULL")
    Page<Resource> findTextsByCategoryId(@Param("x") long categoryId, Pageable pageable);
}