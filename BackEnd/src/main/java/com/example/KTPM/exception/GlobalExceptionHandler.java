package com.example.KTPM.exception;

import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.KTPM.dto.response.ApiRespone;

import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(value=Exception.class)
    ResponseEntity<ApiRespone> handlingException(RuntimeException e) {
        log.error("Unhandled Exception occurred:", e);
        ApiRespone apiRespone=new ApiRespone();
        apiRespone.setCode(ErrorCode.UNKNOWN_EXCEPTION.getCode());
        apiRespone.setMessage(ErrorCode.UNKNOWN_EXCEPTION.getMessage());
        return ResponseEntity.badRequest().body(apiRespone);
    }
    @ExceptionHandler(value=AppException.class)
    ResponseEntity<ApiRespone> handlingAppException(AppException e) {
        ErrorCode eCode=e.getErrorCode();
        return ResponseEntity
                .status(eCode.getHttpStatus())
                .body(ApiRespone.builder()
                        .code(eCode.getCode())
                        .message(eCode.getMessage())
                        .build());
    }
//    @ExceptionHandler(value= AccessDeniedException.class)
//    ResponseEntity<ApiRespone> handlingAccessDeniedException(AccessDeniedException e) {
//        return ResponseEntity
//                .status(ErrorCode.UNAUTHORIZED.getHttpStatus())
//                .body(ApiRespone.builder()
//                        .code(ErrorCode.UNAUTHORIZED.getCode())
//                        .message(ErrorCode.UNAUTHORIZED.getMessage())
//                        .build());
//    }
    /*
    *
    @ExceptionHandler(value= MethodArgumentNotValidException.class)
    ResponseEntity<String>  handlingMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ResponseEntity.badRequest().body(e.getFieldError().getDefaultMessage());
    }
    @ExceptionHandler(value= MethodArgumentNotValidException.class)
    ResponseEntity<ApiRespone>  handlingMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String enumKey=e.getFieldError().getDefaultMessage();
        ErrorCode eCode=ErrorCode.valueOf(enumKey);
        ApiRespone apiRespone=new ApiRespone();
        apiRespone.setCode(eCode.getCode());
        apiRespone.setMessage(eCode.getMessage());
        return ResponseEntity.badRequest().body(apiRespone);
    }
    * */
    @ExceptionHandler(value= MethodArgumentNotValidException.class)
    //khi constraint bị vi phạm thì nó sẽ trả về exception MethodArgumentNotValidException
    ResponseEntity<ApiRespone>  handlingMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String enumKey=e.getFieldError().getDefaultMessage();
        ErrorCode eCode=ErrorCode.INVALID_KEY_EXCEPTION;
        Map<String,Objects> attributes=null;
        try{
            eCode=ErrorCode.valueOf(enumKey);
            // BindingResult, chứa toàn bộ thông tin lỗi validation
            //getAllErrors() Trả về danh sách các lỗi (List<ObjectError>) được tìm thấy trong quá trình validation.
            //getfrist()Lấy phần tử lỗi đầu tiên từ danh sách đó.
            //unwrap() dùng để "gỡ lớp bọc" (wrap) và lấy đối tượng cụ thể bên trong – ở đây là ConstraintViolation
            //Trong Spring, các lỗi có thể được bọc nhiều lớp, nên bạn cần "unwrap" để truy cập chi tiết lỗi kiểu ConstraintViolation.
            var constraintViolations=e.getBindingResult().getAllErrors().getFirst().unwrap(ConstraintViolation.class);
            attributes=constraintViolations.getConstraintDescriptor().getAttributes();

        }catch(IllegalArgumentException ex){
        }
        ApiRespone apiRespone=new ApiRespone();
        apiRespone.setCode(eCode.getCode());
        apiRespone.setMessage(Objects.nonNull(attributes)? mapAttributes(eCode.getMessage(),attributes): eCode.getMessage());
        return ResponseEntity.badRequest().body(apiRespone);
    }
    private String mapAttributes(String message,Map<String,Objects> attribute){
        String value=String.valueOf(attribute.get("min"));
        return message.replace("{"+"min"+"}",value);
    }
}
