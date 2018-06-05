package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "sessions")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Session extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private int PIN;

    @NotBlank
    private int lifeTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPIN() {
        return PIN;
    }

    public void setPIN(int PIN) {
        this.PIN = PIN;
    }

    public int getLifeTime() {
        return lifeTime;
    }

    public void setLifeTime(int lifeTime) {
        this.lifeTime = lifeTime;
    }
}