package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Game;
import com.restservice.archimedes.model.Session;
import com.restservice.archimedes.repository.GameRepository;
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
public class SessionController {

    private final
    SessionRepository sessionRepository;

    private final
    GameRepository gameRepository;

    @Autowired
    public SessionController(SessionRepository sessionRepository, GameRepository gameRepository) {
        this.sessionRepository = sessionRepository;
        this.gameRepository = gameRepository;
    }

    // Get All Sessions
    @GetMapping("/sessions")
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    // Create a new Session
    @PostMapping("/sessions/{game_id}")
    public Session createSession(
            @RequestBody String pin,
            @PathVariable(value = "game_id") long game_id) throws IOException {

        Game game = gameRepository.findById(game_id)
                .orElseThrow(() -> new ResourceNotFoundException("Game","name" ,game_id ));

        JSONObject jsonObject = new JSONObject(pin);
        Session session = new Session();
        session.setPin(jsonObject.getInt("pin"));
        session.setGame(game);
        return sessionRepository.save(session);
    }

    // Get all sessions by game_id
    @GetMapping("/sessions/table/{game_id}")
    public Page<Session> getSessionByGameId(@PathVariable(value = "game_id") long gameId, Pageable pageable) {
        return sessionRepository.findByGameId(gameId, pageable);
    }

    // Get a Single session by pin
    @GetMapping("/session/pin/{pin}")
    public Session getSessionByPin(@PathVariable(value = "pin") int sessionPin) {
        return sessionRepository.findByPin(sessionPin);
    }

    // Update a Session
    @PutMapping("/sessions/{id}")
    public Session updateSession(@PathVariable(value = "id") long sessionId,
                                 @Valid @RequestBody Session sessionDetails) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "id", sessionId));

        session.setId(sessionDetails.getId());
        session.setPin(sessionDetails.getPin());

        return sessionRepository.save(session);
    }

    // Delete a Session
    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<?> deleteSession(@PathVariable(value = "id") long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "id", sessionId));

        sessionRepository.delete(session);

        return ResponseEntity.ok().build();
    }
}