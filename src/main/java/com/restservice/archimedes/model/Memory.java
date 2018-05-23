package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "memory")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Memory extends Rule implements Serializable {

    @NotBlank
    private int setSize;

    @NotBlank
    private Boolean duplicates;

    @NotBlank
    private Boolean inverted;


    public int getSetSize() {
        return setSize;
    }

    public void setSetSize(int setSize) {
        this.setSize = setSize;
    }

    public Boolean getDuplicates() {
        return duplicates;
    }

    public void setDuplicates(Boolean duplicates) {
        this.duplicates = duplicates;
    }

    public Boolean getInverted() {
        return inverted;
    }

    public void setInverted(Boolean inverted) {
        this.inverted = inverted;
    }
}