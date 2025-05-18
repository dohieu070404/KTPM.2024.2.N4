package com.example.KTPM.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "room_amenities")
public class RoomAmenity {
    @Id
    @Size(max = 50)
    @Column(name = "Name", nullable = false, length = 50)
    private String name;

    @Lob
    @Column(name = "Description")
    private String description;

    @Size(max = 255)
    @Column(name = "Icon")
    private String icon;

    @Column(name = "Created_At", updatable = false, insertable = false)
    private Instant createdAt;
}