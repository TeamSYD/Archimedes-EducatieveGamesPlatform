package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Card;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Set;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.CardRepository;
import com.restservice.archimedes.repository.GameRepository;
import com.restservice.archimedes.repository.SetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SetController {

    private final GameRepository gameRepository;
    private final CardRepository cardRepository;
    private final SetRepository setRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public SetController(GameRepository gameRepository,
                         CardRepository cardRepository,
                         AccountRepository accountRepository,
                         SetRepository setRepository) {

        this.gameRepository = gameRepository;
        this.cardRepository = cardRepository;
        this.accountRepository = accountRepository;
        this.setRepository = setRepository;
    }

    // Get a all sets by gameid
    @GetMapping("/games/{id}/sets")
    public List<Set> getCardsByGameId(@PathVariable(value = "id") long gameId, Pageable pageable) {
        Page<Set> set = setRepository.findByGameId(gameId, pageable);
        List<Set> setList = new ArrayList<>();
        int a = set.getContent().size();
        for (int x = 0; x < a; x++) {
            List<Card> cardList = new ArrayList<>();
//            if (!cardRepository.findBySetId(set.getContent().get(x).getId(), pageable).hasContent())
//            {
//                continue;
//            }
            Page<Card> card = cardRepository.findBySetId(set.getContent().get(x).getId(), pageable);
//            if (card != null) {
//                if (card.getContent().size() > 0) {
                    cardList.addAll(card.getContent());
//                }
//            }
//            if(!cardList.isEmpty()) {
                set.getContent().get(x).setCard(cardList);
                setList.add(set.getContent().get(x));
//            }
        }
        return setList;
    }

    // Create a set by gameid
    @PostMapping("/games/{game_id}/set")
    public Set createSetByGameId(@Valid @RequestBody Set set,
                                    @PathVariable(value = "game_id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        set.setGame(game);
        set.setFiller(false);

        return setRepository.save(set);
    }

    // Create a fillerset by gameid
    @PostMapping("/games/{game_id}/fillerset")
    public Set createFillerSetByGameId(@Valid @RequestBody Set set,
                                 @PathVariable(value = "game_id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        set.setGame(game);
        set.setFiller(true);

        return setRepository.save(set);
    }

    // Delete a category
    @DeleteMapping("/set/{id}")
    public ResponseEntity<?> deleteSet(@PathVariable(value = "id") long setId) {
        Set set = setRepository.findById(setId)
                .orElseThrow(() -> new ResourceNotFoundException("Set", "id", setId));

        setRepository.delete(set);

        return ResponseEntity.ok().build();
    }
}