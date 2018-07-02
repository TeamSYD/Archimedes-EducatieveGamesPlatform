package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Score;
import com.restservice.archimedes.model.Scoreboard;
import com.restservice.archimedes.repository.ScoreRepository;
import com.restservice.archimedes.repository.ScoreboardRepository;
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
    public Page<Score> getAllScoreByScoreboard(@PathVariable(value = "scoreboardId") long scoreboardId, Pageable pageable) {
        return scoreRepository.findByScoreboardId(scoreboardId, pageable);
    }

    // Get All Score
    @GetMapping("/scores")
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    // Create a new Score
    @PostMapping("/scores/{scoreboard_id}")
    public Score createScore(
            @RequestBody String json,
            @PathVariable(value = "scoreboard_id") long scoreboard_id) throws IOException {

        Scoreboard scoreboard = scoreboardRepository.findById(scoreboard_id)
                .orElseThrow(() -> new ResourceNotFoundException("Scoreboard", "score", scoreboard_id));

        System.out.println(json);

        JSONObject nameJSON = new JSONObject(json);

        Score score = new Score();
        score.setName(nameJSON.getString("name"));
        score.setGameScore(nameJSON.getInt("game_score"));
        score.setScoreboard(scoreboard);
        return scoreRepository.save(score);
    }

    // Get a Single Score
    @GetMapping("/scores/{id}")
    public Score getScoreById(@PathVariable(value = "id") long scoreId) {
        return scoreRepository.findById(scoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));
    }

    // Update a Score
    @PutMapping("scoreboard/{scoreboardId}/scores/{id}")
    public Score updateScore(@PathVariable(value = "id") long scoreId,
                             @PathVariable(value = "scoreboardId") long scoreboardId,
                             @Valid @RequestBody Score scoreDetails) {

        if (!scoreboardRepository.existsById(scoreboardId)) {
            throw new ResourceNotFoundException("Scoreboard", "id", scoreboardId);
        }
        return scoreRepository.findById(scoreId).map(score -> {
            score.setId(scoreDetails.getId());
            score.setName(scoreDetails.getName());
            score.setGameScore(scoreDetails.getGameScore());
            return scoreRepository.save(score);
        }).orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));
    }


    // Delete a Score
    @DeleteMapping("/scores/{id}")
    public ResponseEntity<?> deleteScore(@PathVariable(value = "id") long scoreId) {
        Score score = scoreRepository.findById(scoreId)
                .orElseThrow(() -> new ResourceNotFoundException("Score", "id", scoreId));

        scoreRepository.delete(score);

        return ResponseEntity.ok().build();
    }
}