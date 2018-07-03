package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.model.Arrangement;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Session;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.ArrangementRepository;
import com.restservice.archimedes.repository.GameRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ArrangementController {

    private final
    ArrangementRepository arrangementRepository;
    private final
    GameRepository gameRepository;
    private final AccountRepository accountRepository;


    @Autowired
    public ArrangementController(ArrangementRepository arrangementRepository,GameRepository gameRepository, AccountRepository accountRepository) {
        this.arrangementRepository = arrangementRepository;
        this.gameRepository = gameRepository;
        this.accountRepository = accountRepository;
    }

    // Get All Arrangements
    @GetMapping("/account/{accountId}/arrangements")
    public Page<Arrangement> getAllArrangementsByAccountId(@PathVariable(value = "accountId") long accountId, Pageable pageable) {
        return arrangementRepository.findByAccountId(accountId, pageable);
    }

    // Create a new Arrangement
    @PostMapping("/arrangements/{acc_id}")
    public Arrangement createArrangement(
            @RequestBody String name,
            @PathVariable(value = "acc_id") long accountId) throws IOException {

        Account account =  accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));

        JSONObject nameJSON = new JSONObject(name);

        Arrangement arrangement = new Arrangement();
        arrangement.setAccount(account);
        arrangement.setName(nameJSON.getString("name"));
        return arrangementRepository.save(arrangement);
    }

    // Get a Single Arrangement
    @GetMapping("/arrangements/{id}")
    public Arrangement getArrangementById(@PathVariable(value = "id") long arrangementId) {
        return arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));
    }

    // Get all games by Arrangement ID
    @GetMapping("/arrangement/{arrangement_id}/games")
    public Page<Game> getGamesByArrangementId(@PathVariable(value = "arrangement_id") long arrangementId, Pageable pageable) {
        return gameRepository.findByArrangementId(arrangementId, pageable);
    }

    // Update a Arrangement
    @PutMapping("/arrangements/{id}")
    public Arrangement updateArrangement(@PathVariable(value = "id") long arrangementId,
                                         @Valid @RequestBody Arrangement arrangementDetails) {

        Arrangement arrangement = arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));

        arrangement.setId(arrangementDetails.getId());

        return arrangementRepository.save(arrangement);
    }

    // Delete a Arrangement
    @DeleteMapping("/arrangements/{id}")
    public ResponseEntity<?> deleteArrangement(@PathVariable(value = "id") long arrangementId) {
        Arrangement arrangement = arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));

        arrangementRepository.delete(arrangement);

        return ResponseEntity.ok().build();
    }
}