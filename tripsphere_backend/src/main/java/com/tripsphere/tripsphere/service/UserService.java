package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.UserDTO;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream().map(this::maptoDTO).collect(Collectors.toList());
    }


    public UserDTO maptoDTO(User user){
        return new UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole(),
            user.getDepartment(),
            user.getEmployeeId(),
            user.getPhone(),
            user.getLocation()
        );
    }
}
