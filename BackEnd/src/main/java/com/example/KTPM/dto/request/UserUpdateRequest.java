package com.example.KTPM.dto.request;

//import com.example.KTPM.Validator.DobConstraint;
import com.example.KTPM.Validator.DobConstraint;
import com.example.KTPM.enums.Roles;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

//@Getter
//@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
//    @Size(max = 100)
//    private String name;
    private String gender;

    private String password;

    @Size(max = 20)
    private String phone;

    private LocalDate dob;
    //    @ColumnDefault("'active'")

    private String status;

    @Size(max = 100)
    private String email;

    private Boolean emailConfirmed;

    private String imageUrl;

    private Boolean isActive;

    private Boolean isDeleted;
    private Roles role;
/*
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
* */
}
