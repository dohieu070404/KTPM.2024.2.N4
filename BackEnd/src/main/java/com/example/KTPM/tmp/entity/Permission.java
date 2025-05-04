//package com.example.KTPM.tmp.entity;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Size;
//import lombok.Getter;
//import lombok.Setter;
//import org.hibernate.annotations.ColumnDefault;
//
//import java.time.Instant;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "permission")
//public class Permission {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "Id", nullable = false)
//    private Integer id;
//
//    @Size(max = 100)
//    @NotNull
//    @Column(name = "Name", nullable = false, length = 100)
//    private String name;
//
//    @Lob
//    @Column(name = "Description")
//    private String description;
//
//    @ColumnDefault("1")
//    @Column(name = "Is_Active")
//    private Boolean isActive;
//
//    @ColumnDefault("0")
//    @Column(name = "Is_Deleted")
//    private Boolean isDeleted;
//
//    @ColumnDefault("CURRENT_TIMESTAMP")
//    @Column(name = "Created_At")
//    private Instant createdAt;
//
//    @Column(name = "Create_User_ID")
//    private Integer createUserId;
//
//    @Column(name = "Deleted_At")
//    private Instant deletedAt;
//
//    @Column(name = "Delete_User_ID")
//    private Integer deleteUserId;
//
//    @Column(name = "Edited_At")
//    private Instant editedAt;
//
//    @Column(name = "Edit_User_ID")
//    private Integer editUserId;
//
//}