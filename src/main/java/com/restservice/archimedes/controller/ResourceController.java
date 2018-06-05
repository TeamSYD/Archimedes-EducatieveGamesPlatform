package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Resource;
import com.restservice.archimedes.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ResourceController {

    private final
    ResourceRepository resourceRepository;

    @Autowired
    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    // Get All Resource
    @GetMapping("/resources")
    public List<Resource> getAllResource() {
        return resourceRepository.findAll();
    }

    // Create a new Resource
    @PostMapping("/resources")
    public Resource createResource(@Valid @RequestBody Resource resource) {
        return resourceRepository.save(resource);
    }

    // Get a Single Resource
    @GetMapping("/resources/{id}")
    public Resource getResourceById(@PathVariable(value = "id") Long resourceId) {
        return resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", resourceId));
    }

    // Update a Resource
    @PutMapping("/resources/{id}")
    public Resource updateResource(@PathVariable(value = "id") Long resourceId,
                                 @Valid @RequestBody Resource resourceDetails) {

        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", resourceId));

        resource.setId(resourceDetails.getId());
        resource.setCategory(resourceDetails.getCategory());
        resource.setName(resourceDetails.getName());
        resource.setType(resourceDetails.getType());

        return resourceRepository.save(resource);
    }

    // Delete a Resource
    @DeleteMapping("/resources/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable(value = "id") Long resourceId) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", resourceId));

        resourceRepository.delete(resource);

        return ResponseEntity.ok().build();
    }
}