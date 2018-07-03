package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Memory;
import com.restservice.archimedes.model.Rule;
import com.restservice.archimedes.repository.GameRepository;
import com.restservice.archimedes.repository.MemoryRepository;
import com.restservice.archimedes.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MemoryController {

    private final
    MemoryRepository memoryRepository;
    private final
    GameRepository gameRepository;
    private final
    RuleRepository ruleRepository;

    @Autowired
    public MemoryController(MemoryRepository memoryRepository, GameRepository gameRepository, RuleRepository ruleRepository) {
        this.memoryRepository = memoryRepository;
        this.gameRepository = gameRepository;
        this.ruleRepository = ruleRepository;
    }

    // Get All Memory
    @GetMapping("/memory")
    public List<Memory> getAllMemory() {
        return memoryRepository.findAll();
    }

    // Create a new Memory
    @PostMapping("/memory")
    public Memory createMemory(@Valid @RequestBody Memory memory) {
        return memoryRepository.save(memory);
    }

    // Get a Single Memory
    @GetMapping("/memory/{id}")
    public Memory getMemoryById(@PathVariable(value = "id") long memoryId) {
        return memoryRepository.findById(memoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Memory", "id", memoryId));
    }
    // Get a Single Memory
    @GetMapping("/memory/{id}/rule")
    public Memory getMemoryByRulId(@PathVariable(value = "id") long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));
        Rule rule = ruleRepository.findById(game.getRule().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", game.getRule().getId()));

        return memoryRepository.findByRuleId(rule.getId());
    }

    // Update a Memory
    @PutMapping("/memory/{id}")
    public Memory updateMemory(@PathVariable(value = "id") long memoryId,
                               @Valid @RequestBody Memory memoryDetails) {

        Memory memory = memoryRepository.findById(memoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Memory", "id", memoryId));

        memory.setId(memoryDetails.getId());
        memory.setDuplicates(memoryDetails.getDuplicates());
        memory.setInverted(memoryDetails.getInverted());
        memory.setMaxCards(memoryDetails.getMaxCards());
        memory.setMinCards(memoryDetails.getMinCards());

        return memoryRepository.save(memory);
    }

    // Update a Memory
    @PutMapping("/memory/{game_id}/update")
    public Memory updateMemoryByGameId(@PathVariable(value = "game_id") long gameId,
                               @Valid @RequestBody Memory memoryDetails) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game", "id", gameId));

        Rule rule = ruleRepository.findById(game.getRule().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", game.getRule().getId()));

        Memory memory = memoryRepository.findByRuleId(rule.getId());

        memory.setDuplicates(memoryDetails.getDuplicates());
        memory.setInverted(memoryDetails.getInverted());

        return memoryRepository.save(memory);
    }

    // Delete a Memory
    @DeleteMapping("/memory/{id}")
    public ResponseEntity<?> deleteMemory(@PathVariable(value = "id") long memoryId) {
        Memory memory = memoryRepository.findById(memoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Memory", "id", memoryId));

        memoryRepository.delete(memory);

        return ResponseEntity.ok().build();
    }
}