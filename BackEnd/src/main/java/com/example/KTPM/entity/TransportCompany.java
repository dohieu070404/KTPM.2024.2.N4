package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "transport_company")
public class TransportCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "Name", nullable = false)
    private String name;

    @Lob
    @Column(name = "Description")
    private String description;

    @Size(max = 50)
    @Column(name = "Phone", length = 50)
    private String phone;

    @Size(max = 100)
    @Column(name = "Email", length = 100)
    private String email;

    @Size(max = 255)
    @Column(name = "Website")
    private String website;

    @Column(name = "Create_User_Id")
    private Integer createUserId;

    @ColumnDefault("1")
    @Column(name = "Is_Active")
    private Boolean isActive;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

    @Column(name = "Updated_At")
    private Instant updatedAt;

}