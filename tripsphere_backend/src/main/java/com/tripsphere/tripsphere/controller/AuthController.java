package com.tripsphere.tripsphere.controller;

import com.tripsphere.tripsphere.dto.LoginRequest;
import com.tripsphere.tripsphere.entity.User;
import com.tripsphere.tripsphere.service.AuthService;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService service;

//    public ResponseEntity<?> login(@RequestBody LoginRequest request){
//        try{
//            return ResponseEntity.ok(service.login(request));
//        }catch (Exception e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

}
