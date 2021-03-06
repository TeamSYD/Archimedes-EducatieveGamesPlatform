package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.model.AccountType;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.AccountTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    private final AccountRepository accountRepository;
    private final AccountTypeRepository accountTypeRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository, AccountTypeRepository accountTypeRepository) {
        this.accountRepository = accountRepository;
        this.accountTypeRepository = accountTypeRepository;
    }

    // Get All Accounts with {accountType}
    @GetMapping("/accounttypes/{accountTypeId}/account")
    public Page<Account> getAllAccountsByAccountType(@PathVariable(value = "accountTypeId") long accountTypeId, Pageable pageable) {
        return accountRepository.findByAccountTypeId(accountTypeId, pageable);
    }

    @GetMapping("/account")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Create a new Account
    @PostMapping("/account")
    public Account createAccount(@Valid @RequestBody Account account) {
        long x = 1;
        AccountType accounttype_id = accountTypeRepository.findById(x)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType", "id", x));
        account.setAccountType(accounttype_id);
        return accountRepository.save(account);
    }

    // Get a Single Account
    @GetMapping("/account/{id}")
    public Account getAccountById(@PathVariable(value = "id") long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));
    }

    // Update a Account
    @PutMapping("/accounttypes/{accountTypeId}/account/{id}")
    public Account updateAccount(@PathVariable(value = "accountTypeId") long accountTypeId,
                                 @PathVariable(value = "id") long accountId,
                                 @Valid @RequestBody Account accountDetails) {

        if (!accountTypeRepository.existsById(accountTypeId)) {
            throw new ResourceNotFoundException("AccountType", "id", accountTypeId);
        }
        return accountRepository.findById(accountId).map(account -> {
            account.setUsername(accountDetails.getUsername());
            account.setPassword(accountDetails.getPassword());
            return accountRepository.save(account);
        }).orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));
    }

    // Delete a Account
    @DeleteMapping("/account/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable(value = "id") long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));

        accountRepository.delete(account);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/accounttypes/{accountTypeId}/account")
    public Account createAccount(@PathVariable(value = "accountTypeId") long accountTypeId,
                                 @Valid @RequestBody Account account) {

        return accountTypeRepository.findById(accountTypeId).map(accountType -> {
            account.setAccountType(accountType);
            return accountRepository.save(account);
        }).orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountTypeId));
    }
}