package com.example.KTPM.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "customer_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Column(name = "Phone", length = 20)
    private String phone;

    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @Column(name = "status")
    private String status; // PENDING | APPROVED | REJECTED

    @Column(name = "Created_At")
    private Instant createdAt;

    @Column(name = "Updated_At")
    private Instant updatedAt;
}
