package com.restservice.archimedes.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Entity
@Table(name = "resources")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Resource extends AuditModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", unique = false, nullable = false, length = 255)
    private String name;

    private String type;

    private String text_resource;

    private String category;

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
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