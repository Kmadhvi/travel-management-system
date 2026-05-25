package com.tripsphere.tripsphere.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "max_budget_per_trip")
    private BigDecimal maxBudgetPerTrip;

    @Enumerated(EnumType.STRING)
    @Column(name = "allowed_travel_class")
    private AllowedTravelClass allowedTravelClass = AllowedTravelClass.ECONOMY;

    @Column(name = "max_daily_food_expense")
    private BigDecimal maxDailyFoodExpense;

    @Column(name = "max_hotel_per_night")
    private BigDecimal maxHotelPerNight;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum AllowedTravelClass {
        ECONOMY, BUSINESS, BOTH
    }
}

