package com.tripsphere.tripsphere.repository;

import com.tripsphere.tripsphere.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog,Long> {
}
