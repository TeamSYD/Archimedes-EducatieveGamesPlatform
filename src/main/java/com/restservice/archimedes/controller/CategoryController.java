package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Category;
import com.restservice.archimedes.repository.AccountRepository;
import com.restservice.archimedes.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CategoryController {

    private final
    CategoryRepository categoryRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get All Categories
    @GetMapping("/category")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //Get all categories by accountid
    @GetMapping("/account/{accountId}/categories")
    public Page<Category> getAllCategoriesByAccountId(@PathVariable(value = "accountId") long accountId, Pageable pageable) {
        return categoryRepository.findByAccountId(accountId, pageable);
    }

    // Create a new category
    @PostMapping("/account/{accountId}/category")
    public Category createCategory(@PathVariable(value = "accountId") long accountId,
                                   @Valid @RequestBody Category category) {
        return accountRepository.findById(accountId).map(account -> {
            category.setName(category.getName().toLowerCase());
            category.setAccount(account);
            return categoryRepository.save(category);
        }).orElseThrow(() -> new ResourceNotFoundException("Account", "id", accountId));
    }

    // Get a Single category
    @GetMapping("/category/{id}")
    public Category getCategoryById(@PathVariable(value = "id") long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
    }

    // Get a Single category by name
    @GetMapping("/category/name/{name}")
    public Category getCategoryByName(@PathVariable(value = "name") String categoryName) {
        return categoryRepository.findByName(categoryName.toLowerCase() );
    }

    // Update a category
    @PutMapping("/account/{accountId}/category/{categoryId}")
    public Category updateCategory(@PathVariable(value = "accountId") long accoundId,
                                   @PathVariable(value = "categoryId") long categoryId,
                                   @Valid @RequestBody Category categoryDetails) {

        if (!accountRepository.existsById(accoundId)) {
            throw new ResourceNotFoundException("Account", "Id", accoundId);
        }
        return categoryRepository.findById(categoryId).map(category -> {
            category.setName(categoryDetails.getName());
            return categoryRepository.save(category);
        }).orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
    }

    // Delete a category
    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable(value = "id") long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        categoryRepository.delete(category);

        return ResponseEntity.ok().build();
    }
}