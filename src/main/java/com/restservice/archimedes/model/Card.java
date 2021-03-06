package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Entity
@Table(name = "cards")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt","hibernateLazyInitializer", "handler"},
        allowGetters = true)
public class Card extends AuditModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "openface_side_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Resource openface_side;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "closedface_side_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Resource closedface_side;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private Set set;

    public Set getSet() {
        return set;
    }

    public void setSet(Set set) {
        this.set = set;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Resource getOpenface_side() {
        return openface_side;
    }

    public void setOpenface_side(Resource openface_side) {
        this.openface_side = openface_side;
    }

    public Resource getClosedface_side() {
        return closedface_side;
    }

    public void setClosedface_side(Resource closedface_side) {
        this.closedface_side = closedface_side;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
