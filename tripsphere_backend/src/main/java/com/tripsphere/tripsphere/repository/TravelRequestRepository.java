package com.tripsphere.tripsphere.repository;

import com.tripsphere.tripsphere.entity.TravelRequest;
import com.tripsphere.tripsphere.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface TravelRequestRepository extends JpaRepository<TravelRequest, Long> {
    List<TravelRequest> findByEmployee(User employee);
    List<TravelRequest> findByManager(User manager);
    List<TravelRequest> findByStatus(TravelRequest.RequestStatus status, Pageable pageable);

}
