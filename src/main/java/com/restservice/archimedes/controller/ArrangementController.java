package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Arrangement;
import com.restservice.archimedes.repository.ArrangementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ArrangementController {

    private final
    ArrangementRepository arrangementRepository;

    @Autowired
    public ArrangementController(ArrangementRepository arrangementRepository) {
        this.arrangementRepository = arrangementRepository;
    }

    // Get All Arrangements
    @GetMapping("/arrangements")
    public List<Arrangement> getAllArrangements() {
        return arrangementRepository.findAll();
    }

    // Create a new Arrangement
    @PostMapping("/arrangements")
    public Arrangement createArrangement(@RequestBody Arrangement arrangement) {
        return arrangementRepository.save(arrangement);
    }

    // Get a Single Arrangement
    @GetMapping("/arrangements/{id}")
    public Arrangement getArrangementById(@PathVariable(value = "id") long arrangementId) {
        return arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));
    }

    // Update a Arrangement
    @PutMapping("/arrangements/{id}")
    public Arrangement updateArrangement(@PathVariable(value = "id") long arrangementId,
                                         @Valid @RequestBody Arrangement arrangementDetails) {

        Arrangement arrangement = arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));

        arrangement.setId(arrangementDetails.getId());

        return arrangementRepository.save(arrangement);
    }

    // Delete a Arrangement
    @DeleteMapping("/arrangements/{id}")
    public ResponseEntity<?> deleteArrangement(@PathVariable(value = "id") long arrangementId) {
        Arrangement arrangement = arrangementRepository.findById(arrangementId)
                .orElseThrow(() -> new ResourceNotFoundException("Arrangement", "id", arrangementId));

        arrangementRepository.delete(arrangement);

        return ResponseEntity.ok().build();
    }
}