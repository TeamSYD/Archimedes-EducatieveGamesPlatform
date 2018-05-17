package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.AccountType;
import com.restservice.archimedes.repository.AccountTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountTypeController {

    @Autowired
    AccountTypeRepository accountTypeRepository;

    // Get All Account
    @GetMapping("/accountTypes")
    public List<AccountType> getAllAccountTypes() {
        return accountTypeRepository.findAll();
    }

    // Create a new Account
    @PostMapping("/accountTypes")
    public AccountType createAccountType(@Valid @RequestBody AccountType accountType) {
        return accountTypeRepository.save(accountType);
    }

    // Get a Single Account
    @GetMapping("/accountTypes/{id}")
    public AccountType getAccountById(@PathVariable(value = "id") Long accountTypeId) {
        return accountTypeRepository.findById(accountTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType", "id", accountTypeId));
    }

    // Update a Account
    @PutMapping("/accountTypes/{id}")
    public AccountType updateAccountType(@PathVariable(value = "id") Long accountTypeId,
                                 @Valid @RequestBody AccountType accountTypeDetails) {

        AccountType accountType = accountTypeRepository.findById(accountTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType", "id", accountTypeId));

        accountType.setType(accountTypeDetails.getType());
        accountType.setMaxArrangements(accountTypeDetails.getMaxArrangements());
        accountType.setMaxGames(accountTypeDetails.getMaxGames());
        accountType.setPrice(accountTypeDetails.getPrice());
        accountType.setDataLimit(accountTypeDetails.getDataLimit());

        AccountType updatedAccountType = accountTypeRepository.save(accountType);
        return updatedAccountType;
    }

    // Delete a Account
    @DeleteMapping("/accountTypes/{id}")
    public ResponseEntity<?> deleteAccountType(@PathVariable(value = "id") Long accountTypeId) {
        AccountType accountType = accountTypeRepository.findById(accountTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType", "id", accountTypeId));

        accountTypeRepository.delete(accountType);

        return ResponseEntity.ok().build();
    }
}