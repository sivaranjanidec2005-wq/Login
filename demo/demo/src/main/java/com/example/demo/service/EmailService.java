package com.example.demo.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {

        try {

            if (to == null || to.isBlank()) {
                throw new IllegalArgumentException(
                        "Recipient email cannot be null");
            }

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true,
                            "UTF-8");

            helper.setFrom("sivaranjanix6@gmail.com");
            helper.setTo(to);
            helper.setSubject(
                    "Verify Your Email Address");

            String htmlContent =
                    """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>

                    <body style="
                        background:#0a0a0a;
                        margin:0;
                        padding:30px;
                        font-family:'Segoe UI',sans-serif;">

                    <div style="
                        max-width:600px;
                        margin:auto;
                        background:#151515;
                        border-radius:20px;
                        overflow:hidden;
                        box-shadow:0 0 25px rgba(0,212,255,0.15);">

                        <div style="
                            background:#00d4ff;
                            padding:25px;
                            text-align:center;">

                            <h1 style="
                                margin:0;
                                color:black;">

                                Attendance Management System

                            </h1>

                        </div>

                        <div style="padding:35px;">

                            <h2 style="
                                color:white;">

                                Verify Your Email

                            </h2>

                            <p style="
                                color:#cccccc;
                                line-height:1.8;">

                                Thank you for creating your account.
                                Please verify your email address
                                using the OTP below.

                            </p>

                            <div style="
                                background:#252525;
                                border:2px solid #00d4ff;
                                border-radius:15px;
                                text-align:center;
                                padding:25px;
                                margin:30px 0;">

                                <span style="
                                    color:#00d4ff;
                                    font-size:40px;
                                    font-weight:bold;
                                    letter-spacing:8px;">

                                    %s

                                </span>

                            </div>

                            <p style="
                                color:#cccccc;
                                line-height:1.8;">

                                This OTP is valid for
                                <b style='color:#00d4ff'>
                                10 minutes
                                </b>.

                            </p>

                            <div style="
                                background:#252525;
                                border-left:4px solid #00d4ff;
                                padding:15px;
                                border-radius:10px;
                                margin-top:20px;">

                                <p style="
                                    color:white;
                                    margin:0;">

                                    🔒 Do not share this OTP with anyone.

                                </p>

                                <p style="
                                    color:#aaaaaa;
                                    margin-top:10px;
                                    margin-bottom:0;">

                                    If you did not create an account,
                                    please ignore this email safely.

                                </p>

                            </div>

                        </div>

                        <div style="
                            background:#252525;
                            padding:20px;
                            text-align:center;">

                            <p style="
                                color:#888;
                                margin:0;">

                                © 2026 Attendance Management System

                            </p>

                        </div>

                    </div>

                    </body>
                    </html>
                    """.formatted(otp);

            helper.setText(
                    htmlContent,
                    true);

            mailSender.send(message);

            System.out.println(
                    "OTP email sent successfully to: "
                            + to);

        } catch (MessagingException e) {

            System.out.println(
                    "Email sending failed");

            e.printStackTrace();
        }
    }
}