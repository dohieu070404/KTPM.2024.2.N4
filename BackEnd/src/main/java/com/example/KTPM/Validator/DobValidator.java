package com.example.KTPM.Validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

public class DobValidator implements ConstraintValidator<DobConstraint, LocalDate> {//LocalDate:kiểu dữ liệu của data sẽ validate
    int min;
    @Override
    //lấy thông tin của annotation diễn ra trước bước isValid
    public void initialize(DobConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        min=constraintAnnotation.min();
    }

    @Override
    //hàm xử lý xem data có đúng hay không
    public boolean isValid(LocalDate localDate, ConstraintValidatorContext constraintValidatorContext) {
        if(Objects.isNull(localDate)) {
            return true;
        }
        long value= ChronoUnit.YEARS.between(localDate, LocalDate.now());

        return value>=min;
    }

}
