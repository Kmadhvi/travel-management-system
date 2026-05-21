package com.tripsphere.tripsphere.dto;

import com.tripsphere.tripsphere.entity.Role;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO  {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String department;
    private String employeeId;
    private String phone;
    private String location;
    private Long managerId;
    private String managerName;

}
