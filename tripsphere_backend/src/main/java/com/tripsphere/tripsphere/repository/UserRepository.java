package com.tripsphere.tripsphere.repository;

import com.tripsphere.tripsphere.entity.Role;
import com.tripsphere.tripsphere.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmployeeId(String employeeId);
    Optional<User> findFirstByRole(Role role);
    List<User> findByRoleAndDepartment(Role role, String department);
    boolean existsByEmail(String email);

}
