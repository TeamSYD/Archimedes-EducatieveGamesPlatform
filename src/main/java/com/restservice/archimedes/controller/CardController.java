package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.model.Card;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.CardRepository;
import com.restservice.archimedes.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CardController {

    private final GameRepository gameRepository;
    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public CardController(GameRepository gameRepository, CardRepository cardRepository, AccountRepository accountRepository) {
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
    }
    // Get a all cards by gameid
    @GetMapping("/games/{id}/cards")
    public Page<Card> getCardsByGameId(@PathVariable(value = "id") long gameId, Pageable pageable) {
        return cardRepository.findByGameId(gameId, pageable);
    }

    // Create a card by gameid
    @PostMapping("/games/{game_id}/cards")
    public Card createCardsByGameId(@Valid @RequestBody Card card,
                                    @PathVariable(value = "game_id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        card.setGame(game);

        return cardRepository.save(card);
    }
}