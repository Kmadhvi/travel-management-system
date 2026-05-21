package com.tripsphere.tripsphere.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "travel_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_number", unique = true, nullable = false)
    private String requestNumber;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false, length = 500)
    private String purpose;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "estimated_budget", nullable = false)
    private BigDecimal estimatedBudget;

    @Enumerated(EnumType.STRING)
    @Column(name = "travel_class")
    private TravelClass travelClass = TravelClass.ECONOMY;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.DRAFT;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "manager_comment", length = 500)
    private String managerComment;

    @ManyToOne
    @JoinColumn(name = "assigned_approver_id")
    private User assignedApprover;

    @Column(name = "requester_role")
    private String requesterRole;

    @Column(name = "finance_comment", length = 500)
    private String financeComment;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum TravelClass {
        ECONOMY, BUSINESS
    }

    public enum RequestStatus {
        DRAFT, PENDING_MANAGER, PENDING_FINANCE, APPROVED, REJECTED
    }


}
