package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "role")
public class Role {
    @Id
    @Size(max = 50)
    @Column(name = "Name", nullable = false, length = 50)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @ColumnDefault("1")
    @Column(name = "Is_Active")
    private Boolean isActive;

    @ColumnDefault("0")
    @Column(name = "Is_Deleted")
    private Boolean isDelete=false;

    @Column(name = "Created_At", updatable = false, insertable = false)
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
    @ManyToMany
    Set<Permission> permission;
}