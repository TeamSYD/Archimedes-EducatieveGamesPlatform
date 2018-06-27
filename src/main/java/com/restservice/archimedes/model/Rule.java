package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Rule extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long ruleId;

    private long maxCards= 100;

    private long minCards = 0;

    public long getId() {
        return ruleId;
    }

    public void setId(long id) {
        this.ruleId = id;
    }

    public long getMaxCards() {
        return maxCards;
    }

    public void setMaxCards(Long maxCards) {
        this.maxCards = maxCards;
    }

    public long getMinCards() {
        return minCards;
    }

    public void setMinCards(Long minCards) {
        this.minCards = minCards;
    }
}