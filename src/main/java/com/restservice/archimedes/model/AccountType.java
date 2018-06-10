package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Table(name = "account_types")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class AccountType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String type;

    @NotBlank
    private int maxArrangements;

    @NotBlank
    private int maxGames;

    @NotBlank
    private double price;

    @NotBlank
    private long dataLimit;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getMaxArrangements() {
        return maxArrangements;
    }

    public void setMaxArrangements(int maxArrangements) {
        this.maxArrangements = maxArrangements;
    }

    public int getMaxGames() {
        return maxGames;
    }

    public void setMaxGames(int maxGames) {
        this.maxGames = maxGames;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getDataLimit() {
        return dataLimit;
    }

    public void setDataLimit(long dataLimit) {
        this.dataLimit = dataLimit;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}