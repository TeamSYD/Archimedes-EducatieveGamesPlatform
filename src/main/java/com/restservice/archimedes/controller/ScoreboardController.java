package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Scoreboard;
import com.restservice.archimedes.model.Session;
import com.restservice.archimedes.repository.ScoreboardRepository;
import com.restservice.archimedes.repository.SessionRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
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

    // Get All Scoreboards
    @GetMapping("/scoreboards")
    public List<Scoreboard> getAllScoreboards() {
        return scoreboardRepository.findAll();
    }

    // Get Scoreboard with {sessionId}
    @GetMapping("/session/{session_id}/scoreboard")
    public Page<Scoreboard> getScoreboardBySession(@PathVariable(value = "sessionId") long session_id, Pageable pageable) {
        return scoreboardRepository.findBySessionId(session_id, pageable);
    }

    // Create a new Scoreboard
    @PostMapping("/scoreboards/{session_id}")
    public Scoreboard createScoreboard(
            @PathVariable(value = "session_id") long session_id) throws IOException {
        Session session = sessionRepository.findById(session_id)
                .orElseThrow(() -> new ResourceNotFoundException("Session","session_id",session_id ));

        Scoreboard scoreboard = new Scoreboard();
        scoreboard.setSession(session);
        return scoreboardRepository.save(scoreboard);
    }

    // Get a Single Scoreboard
    @GetMapping("/scoreboards/{id}")
    public Scoreboard getScoreboardById(@PathVariable(value = "id") long scoreboardId) {
        return scoreboardRepository.findById(scoreboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "id", scoreboardId));
    }

    // Update a Scoreboard
    @PutMapping("sessions/{sessionId}/scoreboards/{id}")
    public Scoreboard updateScoreboard(@PathVariable(value = "sessionId") long sessionId,
                                       @PathVariable(value = "id") long scoreboardId,
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
    public ResponseEntity<?> deleteScoreboard(@PathVariable(value = "id") long scoreboardId) {
        Scoreboard scoreboard = scoreboardRepository.findById(scoreboardId)
                .orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "id", scoreboardId));

        scoreboardRepository.delete(scoreboard);

        return ResponseEntity.ok().build();
    }
}