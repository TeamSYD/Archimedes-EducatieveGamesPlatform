package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "puzzle")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Puzzle extends Rule implements Serializable {

    @NotNull
    private Boolean cardOrder;

    @NotBlank
    private int fillerAmount;

    public Boolean getCardOrder() {
        return cardOrder;
    }

    public void setCardOrder(Boolean cardOrder) {
        this.cardOrder = cardOrder;
    }

    public int getFillerAmount() {
        return fillerAmount;
    }

    public void setFillerAmount(int fillerAmount) {
        this.fillerAmount = fillerAmount;
    }
}
