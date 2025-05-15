package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "room_images")
public class RoomImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Room_Type_Id", nullable = false)
    private RoomType roomType;

    @Size(max = 255)
    @NotNull
    @Column(name = "Image_Url", nullable = false)
    private String imageUrl;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "Is_Primary", nullable = false)
    private Boolean isPrimary = false;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;

}