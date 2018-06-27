package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Puzzle;
import com.restservice.archimedes.repository.PuzzleRepository;
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

    @Autowired
    public PuzzleController(PuzzleRepository puzzleRepository) {
        this.puzzleRepository = puzzleRepository;
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

    // Delete a Puzzle
    @DeleteMapping("/puzzle/{id}")
    public ResponseEntity<?> deletePuzzle(@PathVariable(value = "id") long puzzleId) {
        Puzzle puzzle = puzzleRepository.findById(puzzleId)
                .orElseThrow(() -> new ResourceNotFoundException("Puzzle", "id", puzzleId));

        puzzleRepository.delete(puzzle);

        return ResponseEntity.ok().build();
    }

}