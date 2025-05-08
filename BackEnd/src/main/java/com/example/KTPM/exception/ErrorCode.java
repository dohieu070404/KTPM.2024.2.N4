package com.example.KTPM.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ErrorCode {
    UNKNOWN_EXCEPTION(9999,"Unknown Exception",HttpStatus.INTERNAL_SERVER_ERROR),//500
    INVALID_KEY_EXCEPTION(6666,"Invalid Message Key",HttpStatus.BAD_REQUEST),//400
    USER_EXISTED(1002,"User existed",HttpStatus.BAD_REQUEST),
    USERNAME_SIZE(1003,"Username must be at least {min} characters",HttpStatus.BAD_REQUEST),
    USERPASSWORD_SIZE(1004,"Userpassword must be at least {min} characters",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005,"User not existed",HttpStatus.NOT_FOUND),//404
    USER_UNAUTHENTICATED(1006,"User unauthenticated",HttpStatus.UNAUTHORIZED),//401
    UNAUTHORIZED(1007,"You do not have permission",HttpStatus.FORBIDDEN),//403
    PERMISSION_EXISTED(1008,"Permission already existed",HttpStatus.BAD_REQUEST),//400
    INVALID_Dob(1009," Your age must be at least {min}",HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1010,"Role not existed",HttpStatus.NOT_FOUND),
    //403 xử lý được bằng GlobalExceptionHandler
    //401 thì GlobalExceptionHandler không xử lý được vì 401 xảy ra ở tầng filter trước khi vào service nên phải xử lý trong SecurityConfig
    ;
    ErrorCode(int code, String message,HttpStatus status) {
        this.code = code;
        this.message = message;
        this.httpStatus = status;
    }
    private int code;
    private String message;
    private HttpStatus httpStatus;
}
