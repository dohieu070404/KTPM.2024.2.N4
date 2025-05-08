package com.example.KTPM.dto.request;

//import com.example.KTPM.Validator.DobConstraint;
import com.example.KTPM.Validator.DobConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

//@Getter
//@Setter
@Data//tu dong tao getter setter va ...
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreationRequest {
    @NotNull(message = "USERNAME_REQUIRED")
    @Size(min = 4, max = 100, message = "USERNAME_SIZE")
    private String name;
    @DobConstraint(min=18,message = "INVALID_Dob")
    private LocalDate dob;
    @NotNull(message = "PASSWORD_REQUIRED")
    @Size(min = 8, max = 255, message = "USERPASSWORD_SIZE")
    private String password;

    private String gender; // optional

    @Size(max = 20, message = "PHONE_SIZE")
    private String phone;

    private String status; // optional - default: "active"

    @NotNull(message = "EMAIL_REQUIRED")
    @Size(max = 100, message = "EMAIL_SIZE")
    private String email;

    private Boolean emailConfirmed = false;

    private String imageUrl;
    private Boolean isActive;

    private Boolean isDeleted;
    private Set<String> roles;
/*
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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
