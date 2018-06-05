package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GameController {

    private final
    GameRepository gameRepository;

    @Autowired
    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    // Get All Games
    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    // Create a new Game
    @PostMapping("/games")
    public Game createGame(@Valid @RequestBody Game game) {
        return gameRepository.save(game);
    }

    // Get a Single Game
    @GetMapping("/games/{id}")
    public Game getGameById(@PathVariable(value = "id") Long gameId) {
        return gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));
    }

    // Update a Game
    @PutMapping("/games/{id}")
    public Game updateGame(@PathVariable(value = "id") Long gameId,
                                 @Valid @RequestBody Game gameDetails) {

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        game.setGame(gameDetails.getGame());
        game.setName(gameDetails.getName());
        game.setTime(gameDetails.getTime());


        return gameRepository.save(game);
    }

    // Delete a Game
    @DeleteMapping("/games/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable(value = "id") Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        gameRepository.delete(game);

        return ResponseEntity.ok().build();
    }
}