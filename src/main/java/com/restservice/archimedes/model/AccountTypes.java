package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.io.Serializable;

@Entity
@Table(name = "account_types")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class AccountTypes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String type;

    @NotBlank
    private int maxArrangements;

    @NotBlank
    private int maxGames;

    @NotBlank
    private double price;

    @NotBlank
    private long dataLimit;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    // Getters and Setters ... (Omitted for brevity)
}