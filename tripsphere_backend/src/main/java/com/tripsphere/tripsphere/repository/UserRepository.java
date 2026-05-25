package com.tripsphere.tripsphere.repository;

import com.tripsphere.tripsphere.entity.Role;
import com.tripsphere.tripsphere.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email, Pageable pageable);
    Optional<User> findByEmployeeId(String employeeId);
    Optional<User> findByRole(Role role,Pageable pageable);
    List<User> findByRoleAndDepartment(Role role, String department);
    boolean existsByEmail(String email);

}
