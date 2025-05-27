package com.example.KTPM.configuration;

import com.example.KTPM.dto.request.ApiRespone;
import com.example.KTPM.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        ErrorCode code=ErrorCode.USER_UNAUTHENTICATED;
        response.setStatus(code.getHttpStatus().value());//.value() để lấy giá trị int của HttpStatus()
        //muốn trả về body với content type là json
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiRespone<?> apiRespone= ApiRespone.builder()
                .code(code.getCode())
                .message(code.getMessage())
                .build();
        //tạo mapper để chuyển apiRespone từ kiểu object thành String để cho vào write()
        ObjectMapper mapper = new ObjectMapper();
        //set body cho respone
        response.getWriter().write(mapper.writeValueAsString(apiRespone));
        //Khi bạn ghi dữ liệu vào phản hồi HTTP (sử dụng response.getWriter().write(...)), dữ liệu sẽ không được gửi ngay lập tức mà sẽ được lưu vào bộ đệm của phản hồi.
        //flushBuffer() sẽ buộc dữ liệu trong bộ đệm được gửi ngay đến client.
        response.flushBuffer();
    }
}
