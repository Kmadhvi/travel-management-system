package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.UserDTO;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
   // private PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers(){
        return repository.findAll().stream().map(this::maptoDTO).collect(Collectors.toList());
    }

    public UserDTO createUser(User user) {
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        return maptoDTO(repository.save(user));
    }


    public UserDTO updateUser(Long id, User userDetails) {
        User user = repository.findById(id).orElseThrow();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setDepartment(userDetails.getDepartment());
        user.setEmployeeId(userDetails.getEmployeeId());
        user.setPhone(userDetails.getPhone());
        user.setLocation(userDetails.getLocation());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            //user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        return maptoDTO(repository.save(user));
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public UserDTO updateMyProfile(String email, UserDTO dto) {
        User user = repository.findByEmail(email).orElseThrow();
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setDepartment(dto.getDepartment());
        user.setLocation(dto.getLocation());
        return maptoDTO(repository.save(user));
    }

    public boolean changePassword(String email, String currentPassword, String newPassword) {
        User user = repository.findByEmail(email).orElseThrow();
//        if (passwordEncoder.matches(currentPassword, user.getPassword())) {
//            user.setPassword(passwordEncoder.encode(newPassword));
//            repository.save(user);
//            return true;
//        }
        return false;
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
