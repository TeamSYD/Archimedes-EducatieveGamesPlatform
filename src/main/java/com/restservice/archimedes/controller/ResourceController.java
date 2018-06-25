package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Category;
import com.restservice.archimedes.model.Resource;
import com.restservice.archimedes.model.ResourceType;
import com.restservice.archimedes.model.UploadFileResponse;
import com.restservice.archimedes.repository.CategoryRepository;
import com.restservice.archimedes.repository.ResourceRepository;
import com.restservice.archimedes.service.FileStorageService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ResourceController {

    private final ResourceRepository resourceRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public ResourceController(ResourceRepository resourceRepository, CategoryRepository categoryRepository, FileStorageService fileStorageService) {
        this.resourceRepository = resourceRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }


    // Get All Resource
    @GetMapping("/resources")
    public List<Resource> getAllResource() {
        return resourceRepository.findAll();
    }

    //Get all resources by Category ID
    @GetMapping("/resources/category/{categoryId}")
    public Page<Resource> getAllResourceByCategoryId(@PathVariable(value = "categoryId") long categoryId, Pageable pageable) {
        return resourceRepository.findByCategoryId(categoryId, pageable);
    }

    //Get all Images by Category ID
    @GetMapping("/resources/category/images/{categoryId}")
    public Page<Resource> getAllImagesByCategoryId(@PathVariable(value = "categoryId") long categoryId, Pageable pageable) {
        return resourceRepository.findImagesByCategoryId(categoryId, pageable);
    }

    //Get all Texts by Category ID
    @GetMapping("/resources/category/texts/{categoryId}")
    public Page<Resource> getAllTextByCategoryId(@PathVariable(value = "categoryId") long categoryId, Pageable pageable) {
        return resourceRepository.findTextsByCategoryId(categoryId, pageable);
    }

    // Create a new Resource Image
    @PostMapping(value = "/resources/save_image/{category_id}")
    public Resource AddImage(
                    @RequestBody String file,
            @PathVariable(value = "category_id") long category_id) throws IOException {

        Category category = categoryRepository.findById(category_id)
        .orElseThrow(() -> new ResourceNotFoundException("Category","name" ,category_id ));

        Resource newUpload = new Resource();
        newUpload.setCategory(category);
        newUpload.setType(ResourceType.IMAGE);
        newUpload.setImage_Data(Base64.getEncoder().encode(file.getBytes()));
        System.out.println("File succesfully uploaded and saved...............");
        return resourceRepository.save(newUpload);
    }

    // Create a new Resource
    @PostMapping(value = "/resources/save_text")
    public Resource AddText(
            @RequestBody String text_resource){

        JSONObject jsonObject = new JSONObject(text_resource);
        Resource resource = new Resource();
        resource.setName("");
        resource.setType(ResourceType.TEXT);
        resource.setText_resource(jsonObject.getString("text_resource"));
        return resourceRepository.save(resource);
    }

    // Get a Single Resource
    @GetMapping("/resources/{id}")
    public Resource getResourceById(@PathVariable(value = "id") long resourceId) {
        return resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", resourceId));
    }

    // Update a Resource
    @PutMapping("/resources/{id}")
    public Resource updateResource(@PathVariable(value = "id") long resourceId,
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
    public ResponseEntity<?> deleteResource(@PathVariable(value = "id") long resourceId) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Resource", "id", resourceId));

        resourceRepository.delete(resource);

        return ResponseEntity.ok().build();
    }
}