package com.restservice.archimedes.repository;


import com.restservice.archimedes.model.Category;
import com.restservice.archimedes.model.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {
    Page<Rule> findByRuleId(long ruleId, Pageable pageable);

}