package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "sessions")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Session extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private int pin ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrangement_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Arrangement arrangement;

    public Arrangement getArrangement() { return arrangement; }

    public void setArrangement(Arrangement arrangement) { this.arrangement = arrangement; }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

}