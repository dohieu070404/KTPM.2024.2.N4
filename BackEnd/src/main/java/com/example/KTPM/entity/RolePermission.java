package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "role_permission")
public class RolePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Role_Id", nullable = false)
    private Role role;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Permission_Id", nullable = false)
    private Permission permission;

    @ColumnDefault("0")
    @Column(name = "Is_Deleted")
    private Boolean isDeleted;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Created_At")
    private Instant createdAt;

    @Column(name = "Create_User_ID")
    private Integer createUserId;

    @Column(name = "Deleted_At")
    private Instant deletedAt;

    @Column(name = "Delete_User_ID")
    private Integer deleteUserId;

    @Column(name = "Edited_At")
    private Instant editedAt;

    @Column(name = "Edit_User_ID")
    private Integer editUserId;

}