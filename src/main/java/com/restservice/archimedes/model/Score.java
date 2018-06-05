package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "scores")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Score extends AuditModel implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scoreboard_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Scoreboard scoreboard;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private long score;

    @NotBlank
    private long name;

    @NotBlank
    private long game;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getScore() {
        return score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    public long getName() {
        return name;
    }

    public void setName(long name) {
        this.name = name;
    }

    public long getGame() {
        return game;
    }

    public void setGame(long game) {
        this.game = game;
    }

    public Scoreboard getScoreboard() {
        return scoreboard;
    }

    public void setScoreboard(Scoreboard scoreboard) {
        this.scoreboard = scoreboard;
    }
}