package com.tripsphere.tripsphere.config;

import com.tripsphere.tripsphere.entity.Policy;
import com.tripsphere.tripsphere.entity.Role;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.PolicyRepository;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
public class DataSeeder {
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PolicyRepository policyRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@tripsphere.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setDepartment("IT");
                admin.setEmployeeId("EMP001");

                User manager = new User();
                manager.setName("Manager User");
                manager.setEmail("manager@tripsphere.com");
                manager.setPassword(passwordEncoder.encode("admin123"));
                manager.setRole(Role.MANAGER);
                manager.setDepartment("Sales");
                manager.setEmployeeId("EMP002");

                User finance = new User();
                finance.setName("Finance User");
                finance.setEmail("finance@tripsphere.com");
                finance.setPassword(passwordEncoder.encode("admin123"));
                finance.setRole(Role.FINANCE);
                finance.setDepartment("Finance");
                finance.setEmployeeId("EMP003");

                User employee = new User();
                employee.setName("Employee User");
                employee.setEmail("emp@tripsphere.com");
                employee.setPassword(passwordEncoder.encode("admin123"));
                employee.setRole(Role.EMPLOYEE);
                employee.setDepartment("IT");
                employee.setEmployeeId("EMP004");

                userRepository.saveAll(Arrays.asList(admin, manager, finance, employee));
                System.out.println("Default users seeded.");
            }

            if (policyRepository.count() == 0) {
                Policy policy = new Policy();
                policy.setPolicyName("Standard Corporate Policy");
                policy.setMaxBudgetPerTrip(new BigDecimal("50000.00"));
                policy.setAllowedTravelClass(Policy.AllowedTravelClass.ECONOMY);
                policy.setMaxDailyFoodExpense(new BigDecimal("1000.00"));
                policy.setMaxHotelPerNight(new BigDecimal("5000.00"));
                policyRepository.save(policy);
                System.out.println("Default policy seeded.");
            }
        };
    }
}
