package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Score;
import com.restservice.archimedes.repository.ScoreRepository;
import com.restservice.archimedes.repository.ScoreboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ScoreController {

    private final ScoreRepository scoreRepository;
    private final ScoreboardRepository scoreboardRepository;

    @Autowired
    public ScoreController(ScoreRepository scoreRepository, ScoreboardRepository scoreboardRepository) {
        this.scoreRepository = scoreRepository;
        this.scoreboardRepository = scoreboardRepository;
    }

    // Get All Scores by scoreboard
    @GetMapping("/scoreboard/{scoreboardId}/scores")
    public Page<Score> getAllScoreByScoreboard(@PathVariable(value = "scoreboardId") Long scoreboardId, Pageable pageable) {
        return scoreRepository.findByScoreboardId(scoreboardId, pageable);
    }

    // Get All Score
    @GetMapping("/scores")
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    // Create a new Score
    @PostMapping("/scores")
    public Score createScore(@Valid @RequestBody Score score) {
        return scoreRepository.save(score);
    }

    // Get a Single Score
    @GetMapping("/scores/{id}")
    public Score getScoreById(@PathVariable(value = "id") Long scoreId) {
        return scoreRepository.findById(scoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));
    }

    // Update a Score
    @PutMapping("scoreboard/{scoreboardId}/scores/{id}")
    public Score updateScore(@PathVariable(value = "id") Long scoreId,
                             @PathVariable(value = "scoreboardId") Long scoreboardId,
                             @Valid @RequestBody Score scoreDetails) {

        if (!scoreboardRepository.existsById(scoreboardId)) {
            throw new ResourceNotFoundException("Scoreboard", "id", scoreboardId);
        }
        return scoreRepository.findById(scoreId).map(score -> {
            score.setId(scoreDetails.getId());
            score.setName(scoreDetails.getName());
            score.setScore(scoreDetails.getScore());
            score.setGame(scoreDetails.getGame());
            return scoreRepository.save(score);
        }).orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));
    }


    // Delete a Score
    @DeleteMapping("/scores/{id}")
    public ResponseEntity<?> deleteScore(@PathVariable(value = "id") Long scoreId) {
        Score score = scoreRepository.findById(scoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));

        scoreRepository.delete(score);

        return ResponseEntity.ok().build();
    }
}