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
    HOTEL_EXISTED(1011,"Hotel existed",HttpStatus.BAD_REQUEST),
    ROOM_EXISTED(1012,"Room existed",HttpStatus.BAD_REQUEST),
    HOTEL_NOT_EXISTED(1013,"Hotel not existed",HttpStatus.NOT_FOUND),
    ROOM_NOT_EXISTED(1014, "Room not existed", HttpStatus.NOT_FOUND),
    BOOKING_NOT_EXISTED(1015, "Booking not existed", HttpStatus.NOT_FOUND),
    STATUS_NOT_EXITS(1016, "Status not existed", HttpStatus.NOT_FOUND),
    USER_NOT_OWNER(1017, "User is not the owner of this room", HttpStatus.FORBIDDEN),
    COMPANY_EXISTED(1018, "Company not existed", HttpStatus.NOT_FOUND),
    TRANSPORT_TYPE_EXISTED(1019, "Company existed", HttpStatus.NOT_FOUND),
    TRANSPORT_EXISTED(1020, "Transport existed", HttpStatus.NOT_FOUND),
    TRANSPORT_TYPE_NOT_EXISTED(1021, "Transport type not existed", HttpStatus.NOT_FOUND),
    TRANSPORT_COMPANY_NOT_EXISTED(1022, "Transport company not existed", HttpStatus.NOT_FOUND),
    TRANSPORT_NOT_EXISTED(1023, "Transport not existed", HttpStatus.NOT_FOUND),
    ORDER_NOT_EXISTED(1024, "Order not existed", HttpStatus.NOT_FOUND),
    INVALID_BOOKING_TYPE(1025,"Booking type must be room booking or transport booking",HttpStatus.BAD_REQUEST),
    ORDER_DETAIL_NOT_FOUND(1026, "Order detail not found", HttpStatus.NOT_FOUND),
    ORDER_DETAIL_EXISTED(1027, "Order detail already exists", HttpStatus.BAD_REQUEST),
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
