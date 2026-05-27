package com.tripsphere.tripsphere.controller;

import com.tripsphere.tripsphere.dto.TravelRequestDTO;
import com.tripsphere.tripsphere.entity.TravelRequest;
import com.tripsphere.tripsphere.repository.TravelRequestRepository;
import com.tripsphere.tripsphere.service.TravelRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/travel-requests")
@CrossOrigin(origins = "http://localhost:4200")
public class TravelRequestController {
    @Autowired
    private TravelRequestService service;

    @GetMapping("/all-requests")
    public ResponseEntity<?> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TravelRequestDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable String status) {
        TravelRequest.RequestStatus s = TravelRequest.RequestStatus.valueOf(status.toUpperCase());
        return ResponseEntity.ok(service.getAllRequests().stream()
                .filter(r -> r.getStatus() == s)
                .collect(java.util.stream.Collectors.toList()));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(service.getRequestsByEmployee(employeeId));
    }

    @PostMapping("/add-travel-request")
    public ResponseEntity<?> createRequest(@RequestBody TravelRequestDTO dto) {
        return ResponseEntity.ok(service.createRequest(dto));
    }

    @PutMapping("/{id}/submit")
    public ResponseEntity<?> submitRequest(@PathVariable Long id) {
        return ResponseEntity.ok(service.submitRequest(id));
    }

    @PutMapping("/{id}/approve-manager")
    public ResponseEntity<?> approveByManager(@PathVariable Long id,
                                              @RequestParam Long managerId,
                                              @RequestParam(required = false) String comment) {
        return ResponseEntity.ok(service.approveByManager(id, managerId, comment));
    }

    @PutMapping("/{id}/approve-finance")
    public ResponseEntity<?> approveByFinance(@PathVariable Long id,
                                              @RequestParam(required = false) String comment) {
        return ResponseEntity.ok(service.approveByFinance(id, comment));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id,
                                           @RequestParam String comment) {
        return ResponseEntity.ok(service.rejectRequest(id, comment));
    }
}
