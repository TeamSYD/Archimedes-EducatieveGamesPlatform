package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    // Get All Account
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Create a new Account
    @PostMapping("/accounts")
    public Account createAccount(@Valid @RequestBody Account account) {
        return accountRepository.save(account);
    }

    // Get a Single Account
    @GetMapping("/accounts/{id}")
    public Account getAccountById(@PathVariable(value = "id") Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));
    }

    // Update a Account
    @PutMapping("/accounts/{id}")
    public Account updateAccount(@PathVariable(value = "id") Long accountId,
                                 @Valid @RequestBody Account accountDetails) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));

        account.setUsername(accountDetails.getUsername());
        account.setPassword(accountDetails.getPassword());

        Account updatedAccount = accountRepository.save(account);
        return updatedAccount;
    }

    // Delete a Account
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable(value = "id") Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));

        accountRepository.delete(account);

        return ResponseEntity.ok().build();
    }
}