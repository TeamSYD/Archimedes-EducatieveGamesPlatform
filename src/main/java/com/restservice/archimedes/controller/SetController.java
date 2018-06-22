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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
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
    public Page<Set> getCardsByGameId(@PathVariable(value = "id") long gameId, Pageable pageable) {
        return setRepository.findByGameId(gameId, pageable);
    }

    // Create a set by cardid
    @GetMapping("/games/{game_id}/sets/{card_id}")
    public Page<Set> getSetsByCardId(@PathVariable(value = "id") long gameId,@PathVariable(value = "card_id") long cardId, Pageable pageable) {

        return setRepository.findByCardId(gameId,cardId, pageable);
    }
    // Create a set by gameid
    @PostMapping("/games/{game_id}/set")
    public Set createSetByGameId(@Valid @RequestBody Set set,
                                    @PathVariable(value = "game_id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        set.setGame(game);

        return setRepository.save(set);
    }
}