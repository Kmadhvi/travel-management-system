package com.tripsphere.tripsphere.service;

import com.tripsphere.tripsphere.dto.UserDTO;
import com.tripsphere.tripsphere.entity.Role;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


@Service
public class UserService {

    @Autowired
    private UserRepository repository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public Page<UserDTO> getAllUsers(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<User> users =
                repository.findAll(pageable);

        return users.map(this::maptoDTO);
    }


    public UserDTO createUser(UserDTO dto) {
        // EMAIL VALIDATION
        if(repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException(
                    "Email already exists: "
                            + dto.getEmail()
            );
        }
        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setDepartment(dto.getDepartment());
        user.setEmployeeId(dto.getEmployeeId());
        user.setPhone(dto.getPhone());
        user.setLocation(dto.getLocation());
        user.setPassword("admin@123");
        // Set manager
        if(dto.getManagerId() != null) {

            User manager = repository.findById(dto.getManagerId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Manager not found"
                            ));
            user.setManager(manager);
        }
        User savedUser = repository.save(user);
        return maptoDTO(savedUser);

    }


    public UserDTO updateUser(Long id, UserDTO userDetails) {
        User user = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setDepartment(userDetails.getDepartment());
        user.setEmployeeId(userDetails.getEmployeeId());
        user.setPhone(userDetails.getPhone());
        user.setLocation(userDetails.getLocation());
        if(id.equals(userDetails.getManagerId())) {

            throw new RuntimeException(
                    "User cannot be their own manager"
            );
        }
        // UPDATE MANAGER
        if(userDetails.getManagerId() != null) {

            User manager = repository.findById(
                    userDetails.getManagerId()
            ).orElseThrow(() ->
                    new RuntimeException("Manager not found")
            );

            user.setManager(manager);

        } else {

            // remove manager if null
            user.setManager(null);
        }

        User updatedUser = repository.save(user);

        return maptoDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

//    public UserDTO updateMyProfile(String email, UserDTO dto) {
//        User user = repository.findByEmail(email).orElseThrow();
//        user.setName(dto.getName());
//        user.setPhone(dto.getPhone());
//        user.setDepartment(dto.getDepartment());
//        user.setLocation(dto.getLocation());
//        return maptoDTO(repository.save(user));
//    }

//    public boolean changePassword(String email, String currentPassword, String newPassword) {
//        User user = repository.findByEmail(email).orElseThrow();
//        if (currentPassword != user.getPassword()) {
//            user.setPassword(newPassword);
//            repository.save(user);
//            return true;
//        }
//        return false;
//    }

    public List<UserDTO> getManagersByDepartment(String department) {
        List<User> managers = repository.findByRoleAndDepartment(Role.MANAGER,department);
        return managers.stream().map(this::maptoDTO).collect(Collectors.toList());
    }


    public UserDTO maptoDTO(User user){
        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setDepartment(user.getDepartment());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setPhone(user.getPhone());
        dto.setLocation(user.getLocation());

        // IMPORTANT
        if(user.getManager() != null) {
            dto.setManagerId(
                    user.getManager().getId()
            );
        }

        return dto;
    }
}
