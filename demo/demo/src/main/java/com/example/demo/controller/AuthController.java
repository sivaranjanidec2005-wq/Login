package com.example.demo.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.entity.UserSession;
import com.example.demo.repository.SessionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.EmailService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // ================= REGISTER =================
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) throws MessagingException {

        if (repo.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        user.setEncryptedPassword(
                passwordEncoder.encode(request.getPassword()));

        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setOtpType("REGISTER");
        user.setVerified(false);

        repo.save(user);

        emailService.sendOtpEmail(user.getEmail(), otp);

        return "OTP sent to email for verification";
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) throws MessagingException {

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) {
            return "User not found";
        }

        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        user.setOtpType("FORGOT");

        repo.save(user);

        emailService.sendOtpEmail(email, otp);

        return "OTP sent to email";
    }

    // ================= VERIFY OTP (COMMON FOR BOTH) =================
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email,
                            @RequestParam String otp) {

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (user.getOtp() == null) {
            return "OTP expired";
        }

        if (LocalDateTime.now().isAfter(user.getOtpExpiry())) {
            return "OTP expired";
        }

        if (!user.getOtp().equals(otp)) {
            return "Invalid OTP";
        }

        // ========== REGISTER FLOW ==========
        if ("REGISTER".equals(user.getOtpType())) {

            user.setVerified(true);
            user.setOtp(null);
            user.setOtpExpiry(null);
            user.setOtpType(null);

            repo.save(user);

            return "Email verified successfully";
        }

        // ========== FORGOT PASSWORD FLOW ==========
        if ("FORGOT".equals(user.getOtpType())) {

            user.setOtp(null);
            user.setOtpExpiry(null);

            repo.save(user);

            return "OTP verified. Proceed to reset password";
        }

        return "Invalid OTP type";
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email,
                                @RequestParam String otp,
                                @RequestParam String password) {

        User user = repo.findByEmail(email).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            return "Invalid OTP";
        }

        user.setEncryptedPassword(passwordEncoder.encode(password));
        user.setOtp(null);
        user.setOtpExpiry(null);
        user.setOtpType(null);

        repo.save(user);

        return "Password updated successfully";
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User dbUser = repo.findByEmail(request.getEmail()).orElse(null);

        if (dbUser == null) {
            return new AuthResponse("User not found", null);
        }

        if (!dbUser.isVerified()) {
            return new AuthResponse("Please verify your email first", null);
        }

        if (!passwordEncoder.matches(request.getPassword(), dbUser.getEncryptedPassword())) {
            return new AuthResponse("Invalid Password", null);
        }

        String token = JwtUtil.generateToken(dbUser.getEmail());

        UserSession session = new UserSession();
        session.setEmail(dbUser.getEmail());
        session.setToken(token);
        session.setLoginTime(LocalDateTime.now());

        sessionRepo.save(session);

        return new AuthResponse("Login Successful", token);
    }

    // ================= LOGOUT =================
    @PostMapping("/logout")
    public String logout(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return "Invalid Token";
        }

        String token = authHeader.substring(7);

        sessionRepo.deleteByToken(token);

        return "Logout Successful";
    }
}