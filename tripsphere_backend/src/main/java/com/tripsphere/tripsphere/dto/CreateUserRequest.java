package com.tripsphere.tripsphere.dto;

import com.tripsphere.tripsphere.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateUserRequest {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String department;
    private String employeeId;
    private String phone;
    private String location;
    private Long managerId;
    private String password;
}
