package com.tripsphere.tripsphere.repository;

import com.tripsphere.tripsphere.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PolicyRepository  extends JpaRepository<Policy, Long> {
    Optional<Policy> findFirstByOrderByCreatedAtDesc();
}
