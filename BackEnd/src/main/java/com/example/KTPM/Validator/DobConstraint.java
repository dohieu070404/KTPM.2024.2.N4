package com.example.KTPM.Validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})//annotation sẽ được apply ở đâu
@Retention(RetentionPolicy.RUNTIME)//annotation này sẽ được xử lý lúc nào
@Constraint(validatedBy = {DobValidator.class})//class chịu trách nhiệm validate cho annotation này
public  @interface DobConstraint {
    String message() default "{Invalid day of birth}";//default
    //custom
    int min();
    Class<?>[] groups() default {};//default

    Class<? extends Payload>[] payload() default {};//default
}
