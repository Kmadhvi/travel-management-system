package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.LoginRequest;
import com.tripsphere.tripsphere.dto.LoginResponse;
import com.tripsphere.tripsphere.dto.UserDTO;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.UserRepository;
import com.tripsphere.tripsphere.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // PASSWORD CHECK
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException( "Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getDepartment(),
                user.getEmployeeId(),
                user.getPhone(),
                user.getLocation(),
                user.getManager() != null
                        ? user.getManager().getId()
                        : null,
                user.getManager() != null
                        ? user.getManager().getName()
                        : null
        );

        return new LoginResponse(token, userDTO);
    }
}
