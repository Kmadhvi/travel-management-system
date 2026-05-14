package com.tripsphere.tripsphere.entity;

import com.tripsphere.tripsphere.entity.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users",indexes = {
        @Index(name = "idx_user_email",columnList = "email",unique = true),
        @Index(name = "idx_user_role", columnList = "role")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String department;

    @Column(name = "employee_id", unique = true)
    private String employeeId;

    private String phone;

    private String location;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
