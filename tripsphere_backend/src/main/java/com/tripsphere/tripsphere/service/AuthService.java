package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.LoginRequest;
import com.tripsphere.tripsphere.dto.LoginResponse;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
        return new LoginResponse();
    }

}
