package com.tripsphere.tripsphere.controller;

import com.tripsphere.tripsphere.dto.CreateUserRequest;
import com.tripsphere.tripsphere.dto.PasswordChangeDTO;
import com.tripsphere.tripsphere.dto.UserDTO;
import com.tripsphere.tripsphere.security.JwtUtil;
import com.tripsphere.tripsphere.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:4200",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowedHeaders = "*")

public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(service.getUserByEmail(email));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestBody UserDTO dto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(service.updateMyProfile(email, dto));
    }

    @PutMapping("/me/password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeDTO dto, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractUsername(token);
        boolean success = service.changePassword(email, dto.getCurrentPassword(), dto.getNewPassword());
        if (!success) return ResponseEntity.badRequest().body("Current password is incorrect.");
        return ResponseEntity.ok().body("{\"message\": \"Password changed successfully.\"}");
    }

    @GetMapping("/getusers")
    public ResponseEntity<Page<UserDTO>> getAllUsers(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(service.getAllUsers(page, size));
    }

    @PostMapping("add-user")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
        return ResponseEntity.ok(service.createUser(createUserRequest));
    }

    @PutMapping("update-user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO user) {
        return ResponseEntity.ok(service.updateUser(id,user));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/managers/{department}")
    public ResponseEntity<List<UserDTO>> getManagersByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(service.getManagersByDepartment(department));
    }

}
