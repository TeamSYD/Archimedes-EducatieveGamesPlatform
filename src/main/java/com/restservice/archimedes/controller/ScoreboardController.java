package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Score;
import com.restservice.archimedes.model.Scoreboard;
import com.restservice.archimedes.repository.ScoreboardRepository;
import com.restservice.archimedes.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ScoreboardController {

    private final
    ScoreboardRepository scoreboardRepository;
    private final
    SessionRepository sessionRepository;

    @Autowired
    public ScoreboardController(ScoreboardRepository scoreboardRepository, SessionRepository sessionRepository) {
        this.scoreboardRepository = scoreboardRepository;
        this.sessionRepository = sessionRepository;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="score_id", nullable=false)
    private Score score;

    // Get All Scoreboards
    @GetMapping("/scoreboards")
    public List<Scoreboard> getAllScoreboards() {
        return scoreboardRepository.findAll();
    }

    // Get Scoreboard with {sessionId}
    @GetMapping("/session/{sessionId}/scoreboard")
    public Page<Scoreboard> getScoreboardBySession(@PathVariable (value = "sessionId") Long sessionId, Pageable pageable) {
        return scoreboardRepository.findBySessionId(sessionId, pageable);
    }

    // Create a new Scoreboard
    @PostMapping("/scoreboards")
    public Scoreboard createScoreboard(@Valid @RequestBody Scoreboard scoreboard) {
        return scoreboardRepository.save(scoreboard);
    }

    // Get a Single Scoreboard
    @GetMapping("/scoreboards/{id}")
    public Scoreboard getScoreboardById(@PathVariable(value = "id") Long scoreboardId) {
        return scoreboardRepository.findById(scoreboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "id", scoreboardId));
    }

    // Update a Scoreboard
    @PutMapping("sessions/{sessionId}/scoreboards/{id}")
    public Scoreboard updateScoreboard(@PathVariable(value = "sessionId") Long sessionId,
                                       @PathVariable(value = "id") Long scoreboardId,
                                 @Valid @RequestBody Scoreboard scoreboardDetails) {

        if (!sessionRepository.existsById(sessionId)) {
            throw new ResourceNotFoundException("Session", "id", sessionId);
        }
        return scoreboardRepository.findById(scoreboardId).map(scoreboard -> {
            scoreboard.setId(scoreboardDetails.getId());

            return scoreboardRepository.save(scoreboard);
        }).orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "id", scoreboardId));
    }

    // Delete a Scoreboard
    @DeleteMapping("/scoreboards/{id}")
    public ResponseEntity<?> deleteScoreboard(@PathVariable(value = "id") Long scoreboardId) {
        Scoreboard scoreboard = scoreboardRepository.findById(scoreboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "id", scoreboardId));

        scoreboardRepository.delete(scoreboard);

        return ResponseEntity.ok().build();
    }
}