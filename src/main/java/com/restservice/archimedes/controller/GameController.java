package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.model.Card;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Rule;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.CardRepository;
import com.restservice.archimedes.repository.GameRepository;
import com.restservice.archimedes.repository.RuleRepository;
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

    @Autowired
    public GameController(GameRepository gameRepository, CardRepository cardRepository, AccountRepository accountRepository, RuleRepository ruleRepository) {
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
        this.ruleRepository = ruleRepository;
    }


    //Get all categories by accountid
    @GetMapping("/account/{accountId}/games")
    public Page<Game> getAllCategoriesByAccountId(@PathVariable(value = "accountId") long accountId, Pageable pageable) {
        return gameRepository.findByAccountId(accountId, pageable);
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