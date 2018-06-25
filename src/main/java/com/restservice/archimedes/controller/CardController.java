package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Account;
import com.restservice.archimedes.model.Card;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Resource;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.CardRepository;
import com.restservice.archimedes.repository.GameRepository;
import com.restservice.archimedes.repository.ResourceRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CardController {

    private final GameRepository gameRepository;
    private final CardRepository cardRepository;
    private final ResourceRepository resourceRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public CardController(GameRepository gameRepository, CardRepository cardRepository, AccountRepository accountRepository, ResourceRepository resourceRepository) {
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
        this.resourceRepository = resourceRepository;
    }
    // Get a all cards by gameid
    @GetMapping("/games/{id}/cards")
    public Page<Card> getCardsByGameId(@PathVariable(value = "id") long gameId, Pageable pageable) {
        return cardRepository.findByGameId(gameId, pageable);
    }

    // Create a card by gameid
    @PostMapping("/games/{game_id}/cards")
    public Card createCardsByGameId(@RequestBody String json,
                                    @PathVariable(value = "game_id") long gameId) {
        System.out.println(json);
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));
        JSONObject jsonObject = new JSONObject(json);
        System.out.println(jsonObject.toString());
        Resource resource_open = resourceRepository.findById(jsonObject.getLong("openface_side_id"))
                .orElseThrow(() -> new ResourceNotFoundException("Resource:: resource_open", "id", gameId));

        Resource resource_closed = resourceRepository.findById(jsonObject.getLong("closedface_side_id"))
                .orElseThrow(() -> new ResourceNotFoundException("Resource:: resource_closed", "id", gameId));

        Card card = new Card();
        card.setClosedface_side(resource_closed);
        card.setOpenface_side(resource_open);
        card.setGame(game);

        return cardRepository.save(card);
    }
}