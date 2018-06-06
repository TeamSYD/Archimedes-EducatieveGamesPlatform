package com.restservice.archimedes.controller;

import com.restservice.archimedes.exception.ResourceNotFoundException;
import com.restservice.archimedes.model.Role;
import com.restservice.archimedes.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RoleController {

    private final
    RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Get All Roles
    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Create a new Role
    @PostMapping("/roles")
    public Role createRole(@Valid @RequestBody Role role) {
        return roleRepository.save(role);
    }

    // Get a Single Role
    @GetMapping("/roles/{id}")
    public Role getRoleById(@PathVariable(value = "id") long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));
    }

    // Update a Role
    @PutMapping("/roles/{id}")
    public Role updateRole(@PathVariable(value = "id") long roleId,
                           @Valid @RequestBody Role roleDetails) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));

        role.setId(roleDetails.getId());
        role.setRole(roleDetails.getRole());

        return roleRepository.save(role);
    }

    // Delete a Role
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable(value = "id") long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));

        roleRepository.delete(role);

        return ResponseEntity.ok().build();
    }
}