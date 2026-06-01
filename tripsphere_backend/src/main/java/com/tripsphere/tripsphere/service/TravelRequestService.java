package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.TravelRequestDTO;
import com.tripsphere.tripsphere.entity.AuditLog;
import com.tripsphere.tripsphere.entity.Role;
import com.tripsphere.tripsphere.entity.TravelRequest;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.AuditLogRepository;
import com.tripsphere.tripsphere.repository.TravelRequestRepository;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelRequestService {
    @Autowired
    private TravelRequestRepository travelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    public List<TravelRequestDTO> getAllRequests() {
        return travelRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<TravelRequestDTO> getRequestsByEmployee(Long employeeId) {
        User employee = userRepository.findById(employeeId).orElseThrow();
        return travelRepository.findByEmployee(employee).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public TravelRequestDTO getById(Long id) {
        return travelRepository.findById(id).map(this::mapToDTO).orElseThrow();
    }


    public TravelRequestDTO createRequest(TravelRequestDTO travelRequestDTO) {
        TravelRequest request = new TravelRequest();
        request.setDestination(travelRequestDTO.getDestination());
        request.setPurpose(travelRequestDTO.getPurpose());
        request.setStartDate(travelRequestDTO.getStartDate());
        request.setEndDate(travelRequestDTO.getEndDate());
        request.setEstimatedBudget(travelRequestDTO.getEstimatedBudget());
        request.setTravelClass(travelRequestDTO.getTravelClass());
        request.setEmployee(userRepository.findById(travelRequestDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found")));
        request.setRequesterRole(travelRequestDTO.getRequesterRole());

        if(TravelRequest.RequestStatus.PENDING_MANAGER.equals(travelRequestDTO.getStatus())){
            request.setStatus(TravelRequest.RequestStatus.PENDING_MANAGER);
            if(travelRequestDTO.getRequesterRole().equals("Manager")){
                User admin = userRepository.findFirstByRole(Role.ADMIN).orElseThrow();
                request.setAssignedApprover(admin);
            }else{
                User manager = userRepository
                        .findFirstByRoleAndDepartment(Role.MANAGER, travelRequestDTO.getDepartment())
                        .orElse(userRepository.findFirstByRole(Role.ADMIN).orElseThrow());
                request.setAssignedApprover(manager);
            }
        }else {
            request.setStatus(TravelRequest.RequestStatus.DRAFT);
        }

        request.setCreatedAt(LocalDateTime.now());
        request.setUpdatedAt(LocalDateTime.now());
        request.setRequestNumber(
                "TR" + System.currentTimeMillis()
        );
        TravelRequest saved = travelRepository.save(request);

        String requestNumber = "TR"
                + LocalDate.now().getYear()
                + "-"
                + String.format("%04d", saved.getId());

        saved.setRequestNumber(requestNumber);

        saved = travelRepository.save(saved);

        return mapToDTO(saved);
    }

    public TravelRequestDTO submitRequest(Long id) {
        TravelRequest request = travelRepository.findById(id).orElseThrow();
        request.setStatus(TravelRequest.RequestStatus.PENDING_MANAGER);
        TravelRequest saved = travelRepository.save(request);

        logAction("SUBMIT", "TravelRequest", id, request.getEmployee(), "Request submitted for approval");

        return mapToDTO(saved);
    }

    public TravelRequestDTO approveByManager(Long id, Long managerId, String comment) {
        TravelRequest request = travelRepository.findById(id).orElseThrow();
        User manager = userRepository.findById(managerId).orElseThrow();

        request.setStatus(TravelRequest.RequestStatus.PENDING_FINANCE);
        request.setManager(manager);
        request.setManagerComment(comment);

        TravelRequest saved = travelRepository.save(request);
        logAction("APPROVE_MANAGER", "TravelRequest", id, manager, "Approved by Manager: " + comment);

        return mapToDTO(saved);
    }

    public TravelRequestDTO approveByFinance(Long id, String comment) {
        TravelRequest request = travelRepository.findById(id).orElseThrow();
        // Assuming current user is finance, we'll need to pass performer in real app
        request.setStatus(TravelRequest.RequestStatus.APPROVED);
        request.setFinanceComment(comment);

        TravelRequest saved = travelRepository.save(request);
        // Performer should be fetched from SecurityContext in a real scenario
        logAction("APPROVE_FINANCE", "TravelRequest", id, null, "Approved by Finance: " + comment);

        return mapToDTO(saved);
    }

    public TravelRequestDTO rejectRequest(Long id, String comment) {
        TravelRequest request = travelRepository.findById(id).orElseThrow();
        request.setStatus(TravelRequest.RequestStatus.REJECTED);

        // Logic for who rejected would go here
        TravelRequest saved = travelRepository.save(request);
        logAction("REJECT", "TravelRequest", id, null, "Rejected: " + comment);

        return mapToDTO(saved);
    }
    private void logAction(String action, String type, Long entityId, User performer, String desc) {
        AuditLog log = AuditLog.builder()
                .action(action)
                .entityType(type)
                .entityId(entityId)
                .performedBy(performer)
                .description(desc)
                .createdAt(LocalDateTime.now())
                .build();
        auditLogRepository.save(log);
    }

    private TravelRequestDTO mapToDTO(TravelRequest req) {
        return new TravelRequestDTO(
                req.getId(),
                req.getRequestNumber(),
                req.getEmployee().getId(),
                req.getEmployee().getName(),
                req.getDestination(),
                req.getPurpose(),
                req.getStartDate(),
                req.getEndDate(),
                req.getEstimatedBudget(),
                req.getTravelClass(),
                req.getStatus(),
                req.getManager() != null ? req.getManager().getId() : null,
                req.getManagerComment(),
                req.getFinanceComment(),
                req.getRequesterRole(),
                req.getEmployee().getDepartment(),
                null, // additionalNotes not in entity yet, or handled separately
                req.getAssignedApprover() != null ? req.getAssignedApprover().getId() : null
        );
    }


}
