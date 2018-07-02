package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.*;
import com.restservice.archimedes.repository.*;
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
    private final SetRepository setRepository;

    @Autowired
    public CardController(GameRepository gameRepository, CardRepository cardRepository, AccountRepository accountRepository, ResourceRepository resourceRepository, SetRepository setRepository) {
        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
        this.resourceRepository = resourceRepository;
        this.setRepository = setRepository;
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

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        JSONObject jsonObject = new JSONObject(json);

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

    @PutMapping("card/{card_id}/set/{set_id}")
    public Card updateCardWithSet(@PathVariable(value = "set_id") long set_id,
                                  @PathVariable(value = "card_id") long card_id){
        Card card = cardRepository.findById(card_id)
                .orElseThrow(() -> new ResourceNotFoundException("Card:", "id", card_id));
        Set set = setRepository.findById(set_id)
                .orElseThrow(() -> new ResourceNotFoundException("Set:", "id", set_id));
        card.setSet(set);
        return cardRepository.save(card);
    }

    @PutMapping("card/{card_id}/noset")
    public Card unlinkCardFromSet(@PathVariable(value = "card_id") long card_id){
        Card card = cardRepository.findById(card_id)
                .orElseThrow(() -> new ResourceNotFoundException("Card:", "id", card_id));
        card.setSet(null);
        return cardRepository.save(card);
    }

    // Delete a card
    @DeleteMapping("/card/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable(value = "id") long cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new ResourceNotFoundException("Card", "id", cardId));

        cardRepository.delete(card);

        return ResponseEntity.ok().build();
    }
}