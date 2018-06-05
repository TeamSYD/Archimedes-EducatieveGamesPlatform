package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Session;
import com.restservice.archimedes.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SessionController {

    private final
    SessionRepository sessionRepository;

    @Autowired
    public SessionController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // Get All Sessions
    @GetMapping("/sessions")
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    // Create a new Session
    @PostMapping("/sessions")
    public Session createSession(@Valid @RequestBody Session session) {
        return sessionRepository.save(session);
    }

    // Get a Single Session
    @GetMapping("/sessions/{id}")
    public Session getSessionById(@PathVariable(value = "id") Long sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "id", sessionId));
    }

    // Update a Session
    @PutMapping("/sessions/{id}")
    public Session updateSession(@PathVariable(value = "id") Long sessionId,
                                 @Valid @RequestBody Session sessionDetails) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "id", sessionId));

        session.setId(sessionDetails.getId());
        session.setLifeTime(sessionDetails.getLifeTime());
        session.setPIN(sessionDetails.getPIN());

        return sessionRepository.save(session);
    }

    // Delete a Session
    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<?> deleteSession(@PathVariable(value = "id") Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session", "id", sessionId));

        sessionRepository.delete(session);

        return ResponseEntity.ok().build();
    }
}