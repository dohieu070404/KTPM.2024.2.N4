package com.example.KTPM.dto.request;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.Set;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequest {
//    private Set<String> permissions;
    @Size(max = 50)
    private String name;
    private String description;
    private Boolean isActive;
    private Boolean isDeleted;
    private Instant createdAt;
    private Integer createUserId;
    private Instant deletedAt;
    private Integer deleteUserId;
    private Instant editedAt;
    private Integer editUserId;
    private Set<String> permissions;
}
