package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Rule extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String maxCards;

    @NotBlank
    private String minCards;



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMaxCards() {
        return maxCards;
    }

    public void setMaxCards(String maxCards) {
        this.maxCards = maxCards;
    }

    public String getMinCards() {
        return minCards;
    }

    public void setMinCards(String minCards) {
        this.minCards = minCards;
    }


}