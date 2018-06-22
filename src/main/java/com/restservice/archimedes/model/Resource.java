package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Entity
@Table(name = "resources")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt","hibernateLazyInitializer", "handler"},
        allowGetters = true)
public class Resource extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", unique = false, nullable = true, length = 255)
    private String name;

    private ResourceType type;

    @Column(nullable = true)
    private String text_resource;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @Column(name = "IMAGE_DATA", unique = false, nullable = true, length = 100000)
    private byte[] image_data;

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

    @Enumerated(EnumType.ORDINAL)
    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public byte[] getImage_data() {
        return image_data;
    }

    public void setImage_Data(byte[] data) {
        this.image_data = data;
    }

    public String getText_resource() {
        return text_resource;
    }

    public void setText_resource(String text_resource) {
        this.text_resource = text_resource;
    }

}