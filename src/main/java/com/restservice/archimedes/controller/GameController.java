package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.*;
import com.restservice.archimedes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class GameController {

    private final GameRepository gameRepository;
    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;
    private final RuleRepository ruleRepository;
    private final ArrangementRepository arrangementRepository;

    @Autowired
    public GameController(GameRepository gameRepository, CardRepository cardRepository, AccountRepository accountRepository, RuleRepository ruleRepository, ArrangementRepository arrangementRepository) {
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
        this.ruleRepository = ruleRepository;
        this.arrangementRepository = arrangementRepository;
    }


    //Get all categories by accountid
    @GetMapping("/account/{accountId}/games")
    public Page<Game> getAllCategoriesByAccountId(@PathVariable(value = "accountId") long accountId, Pageable pageable) {
        return gameRepository.findByAccountId(accountId, pageable);
    }

    //Get all games by arrangementid
    @GetMapping("/arrangement/{arrangementId}/games")
    public Page<Game> getAllGamesByArrangementId(@PathVariable(value = "arrangementId") long arrangementId, Pageable pageable) {
        return gameRepository.findByArrangementId(arrangementId, pageable);
    }

    // Get All Games
    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    // Create a new Game
    @PostMapping("/games/{acc_id}/{rule_id}")
    public Game createGame(@Valid @RequestBody Game game,
                           @PathVariable(value = "acc_id") long accountId,
                           @PathVariable(value = "rule_id") long ruleId)
    {

        System.out.println(game.getTime());
        Account account =  accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));

        Rule rule =  ruleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", ruleId));


        game.setAccount(account);
        game.setRule(rule);
        System.out.println(account.getUsername());
        return gameRepository.save(game);
    }

    // Get a Single Game
    @GetMapping("/games/{id}")
    public Game getGameById(@PathVariable(value = "id") long gameId) {
        return gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));
    }

    // Insert arrangement id
    @PutMapping("/games/{id}/arrangement/{arrangement_id}")
    public Game insertArrangementIdIntoGame(@PathVariable(value = "id") long game_id,
                                   @PathVariable(value = "arrangement_id") long arrangement_id) {
        Game game = gameRepository.findById(game_id)
                .orElseThrow(() -> new ResourceNotFoundException("Game:", "id", game_id));
        Arrangement arrangement = arrangementRepository.findById(arrangement_id)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement:", "id", arrangement_id));

        game.setArrangement(arrangement);
        return gameRepository.save(game);
    }

    // Update a Game
    @PutMapping("/games/{id}")
    public Game updateGame(@PathVariable(value = "id") long gameId,
                           @Valid @RequestBody Game gameDetails) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        game.setGame(gameDetails.getGame());
        game.setName(gameDetails.getName());
        game.setTime(gameDetails.getTime().intValue());


        return gameRepository.save(game);
    }

    // Delete a Game
    @DeleteMapping("/games/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable(value = "id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        gameRepository.delete(game);

        return ResponseEntity.ok().build();
    }
}