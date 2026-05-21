package com.tripsphere.tripsphere.dto;

import com.tripsphere.tripsphere.entity.TravelRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TravelRequestDTO {
    private Long id;
    private String requestNumber;
    private Long employeeId;
    private String employeeName;
    private String destination;
    private String purpose;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal estimatedBudget;
    private TravelRequest.TravelClass travelClass;
    private TravelRequest.RequestStatus status;
    private Long managerId;
    private String managerComment;
    private String financeComment;
    private String requesterRole;
    private String department;
    private String additionalNotes;
    private Long assignedApproverId;

}
