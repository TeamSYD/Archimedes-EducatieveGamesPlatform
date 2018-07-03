package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Puzzle;
import com.restservice.archimedes.model.Rule;
import com.restservice.archimedes.repository.GameRepository;
import com.restservice.archimedes.repository.PuzzleRepository;
import com.restservice.archimedes.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class PuzzleController {

    private final PuzzleRepository puzzleRepository;
    private final GameRepository gameRepository;
    private final RuleRepository ruleRepository;

    @Autowired
    public PuzzleController(PuzzleRepository puzzleRepository, RuleRepository ruleRepository, GameRepository gameRepository) {
        this.puzzleRepository = puzzleRepository;
        this.ruleRepository = ruleRepository;
        this.gameRepository = gameRepository;
    }

    // Get All Puzzle
    @GetMapping("/puzzle")
    public List<Puzzle> getAllPuzzle() {
        return puzzleRepository.findAll();
    }

    // Create a new Puzzle
    @PostMapping("/puzzle")
    public Puzzle createPuzzle(@Valid @RequestBody Puzzle puzzle) {
        return puzzleRepository.save(puzzle);
    }

    // Get a Single puzzle
    @GetMapping("/puzzle/{id}")
    public Puzzle getPuzzleById(@PathVariable(value = "id") long puzzleId) {
        return puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new ResourceNotFoundException("Puzzle", "id", puzzleId));
    }


    // Get a Single puzzle
    @GetMapping("/puzzle/{id}/rule")
    public Puzzle getPuzzleByRuleId(@PathVariable(value = "id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));
        Rule rule = ruleRepository.findById(game.getRule().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", game.getRule().getId()));

        return puzzleRepository.findByRuleId(rule.getId());
    }

    // Update a puzzle
    @PutMapping("/puzzle/{id}")
    public Puzzle updatePuzzle(@PathVariable(value = "id") long puzzleId,
                               @Valid @RequestBody Puzzle puzzleDetails) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new ResourceNotFoundException("Puzzle", "id", puzzleId));

        puzzle.setId(puzzleDetails.getId());
        puzzle.setCardOrder(puzzleDetails.getCardOrder());
        puzzle.setMaxCards(puzzleDetails.getMaxCards());
        puzzle.setMinCards(puzzleDetails.getMinCards());

        return puzzleRepository.save(puzzle);
    }

    // Update a puzzle
    @PutMapping("/puzzle/{game_id}/update")
    public Puzzle updatePuzzleByGameId(@PathVariable(value = "game_id") long gameId,
                                       @Valid @RequestBody Puzzle puzzleDetails) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        Rule rule = ruleRepository.findById(game.getRule().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", game.getRule().getId()));

        Puzzle puzzle = puzzleRepository.findByRuleId(rule.getId());

        puzzle.setCardOrder(puzzleDetails.getCardOrder());

        return puzzleRepository.save(puzzle);
    }

    // Delete a Puzzle
    @DeleteMapping("/puzzle/{id}")
    public ResponseEntity<?> deletePuzzle(@PathVariable(value = "id") long puzzleId) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new ResourceNotFoundException("Puzzle", "id", puzzleId));

        puzzleRepository.delete(puzzle);

        return ResponseEntity.ok().build();
    }

}