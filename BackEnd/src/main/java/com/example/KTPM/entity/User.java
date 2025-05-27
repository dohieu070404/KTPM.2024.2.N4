package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Lob
    @Column(name = "Customer")
    private String customer;

    @Lob
    @Column(name = "gender")
    private String gender;

    @NotNull
    @Lob
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 20)
    @Column(name = "Phone", length = 20)
    private String phone;

    @Lob
    @Column(name = "status")
    private String status;

    @Size(max = 100)
    @NotNull
    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @ColumnDefault("0")
    @Column(name = "Email_confirmed")
    private Boolean emailConfirmed;

    @Lob
    @Column(name = "image_url")
    private String imageUrl;

    @ColumnDefault("1")
    @Column(name = "Is_Active")
    private Boolean isActive;

    @ColumnDefault("0")
    @Column(name = "Is_Deleted")
    private Boolean isDelete=false;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

    @Column(name = "Deleted_At")
    private Instant deletedAt;

    @Column(name = "Delete_User_ID")
    private Integer deleteUserId;

    @Column(name = "Edited_At")
    private Instant editedAt;

    @Column(name = "Edit_User_ID")
    private Integer editUserId;

    @Column(name = "create_user_id")
    private Integer createUserId;

    @Column(name = "dob")
    private LocalDate dob;
    @ManyToMany
    private Set<Role> role;
}