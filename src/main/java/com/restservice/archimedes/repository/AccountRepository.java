package com.restservice.archimedes.repository;

import com.restservice.archimedes.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Page<Account> findByAccountTypeId(long accountTypeId, Pageable pageable);
}