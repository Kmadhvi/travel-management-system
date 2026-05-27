package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.entity.Policy;
import com.tripsphere.tripsphere.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository repository;

    public List<Policy> getAllPolicies() {
        return repository.findAll();
    }

    public Policy getActivePolicy(){
        return repository.findFirstByOrderByCreatedAtDesc().orElse(null);
    }
    public Policy updatePolicy(Long id,Policy details){
        Policy policy = repository.findById(id).orElseThrow();
        policy.setPolicyName(details.getPolicyName());
        policy.setMaxBudgetPerTrip(details.getMaxBudgetPerTrip());
        policy.setAllowedTravelClass(details.getAllowedTravelClass());
        policy.setMaxDailyFoodExpense(details.getMaxDailyFoodExpense());
        policy.setMaxHotelPerNight(details.getMaxHotelPerNight());
        return repository.save(policy);
    }
    public Policy createPolicy(Policy policy) {
        return repository.save(policy);
    }

}
