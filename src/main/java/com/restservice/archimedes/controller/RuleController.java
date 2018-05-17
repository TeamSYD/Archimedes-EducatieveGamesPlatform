package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Rule;
import com.restservice.archimedes.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RuleController {

    private final
    RuleRepository ruleRepository;

    @Autowired
    public RuleController(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    // Get All Rules
    @GetMapping("/rules")
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }

    // Create a new Rule
    @PostMapping("/rules")
    public Rule createRule(@Valid @RequestBody Rule rule) {
        return ruleRepository.save(rule);
    }

    // Get a Single Rule
    @GetMapping("/rules/{id}")
    public Rule getRuleById(@PathVariable(value = "id") Long ruleId) {
        return ruleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", ruleId));
    }

    // Update a Rule
    @PutMapping("/rules/{id}")
    public Rule updateRule(@PathVariable(value = "id") Long ruleId,
                                 @Valid @RequestBody Rule ruleDetails) {

        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", ruleId));

        rule.setId(ruleDetails.getId());
        rule.setMaxCards(ruleDetails.getMaxCards());
        rule.setMinCards(ruleDetails.getMinCards());

        return ruleRepository.save(rule);
    }

    // Delete a Rule
    @DeleteMapping("/rules/{id}")
    public ResponseEntity<?> deleteRule(@PathVariable(value = "id") Long ruleId) {
        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule", "id", ruleId));

        ruleRepository.delete(rule);

        return ResponseEntity.ok().build();
    }
}