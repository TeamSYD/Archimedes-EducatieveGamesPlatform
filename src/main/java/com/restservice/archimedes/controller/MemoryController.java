package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Memory;
import com.restservice.archimedes.repository.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MemoryController {

    private final
    MemoryRepository memoryRepository;

    @Autowired
    public MemoryController(MemoryRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
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

    // Delete a Memory
    @DeleteMapping("/memory/{id}")
    public ResponseEntity<?> deleteMemory(@PathVariable(value = "id") long memoryId) {
        Memory memory = memoryRepository.findById(memoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Memory", "id", memoryId));

        memoryRepository.delete(memory);

        return ResponseEntity.ok().build();
    }
}