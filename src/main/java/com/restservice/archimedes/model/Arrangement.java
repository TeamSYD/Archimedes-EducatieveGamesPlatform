package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sessions")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Arrangement extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() { return id; }

    public void setId(long id) {
        this.id = id;
    }

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "arrangement_game",
            joinColumns = { @JoinColumn(name = "arrangement_id") },
            inverseJoinColumns = { @JoinColumn(name = "game_id") }
    )
    public Set<Game> games = new HashSet<>();


}