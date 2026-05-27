package com.tripsphere.tripsphere.controller;

import com.tripsphere.tripsphere.entity.Policy;
import com.tripsphere.tripsphere.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:4200")
public class PolicyController {

    @Autowired
    private PolicyService service;

    @GetMapping
    public ResponseEntity<?> getPolicies() {
        return ResponseEntity.ok(service.getAllPolicies());
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActivePolicy() {
        return ResponseEntity.ok(service.getActivePolicy());
    }

    @PostMapping
    public ResponseEntity<?> createPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(service.createPolicy(policy));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePolicy(@PathVariable Long id, @RequestBody Policy policy) {
        return ResponseEntity.ok(service.updatePolicy(id, policy));
    }
}