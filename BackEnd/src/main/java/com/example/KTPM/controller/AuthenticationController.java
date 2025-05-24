package com.example.KTPM.controller;

import com.example.KTPM.dto.request.*;
import com.example.KTPM.dto.response.ApiRespone;
import com.example.KTPM.dto.response.AuthenticationRespone;
//import com.example.KTPM.dto.response.IntrospectRespone;
import com.example.KTPM.dto.response.IntrospectRespone;
import com.example.KTPM.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    //đăng nhập
    @PostMapping("/log-in")
    ApiRespone<AuthenticationRespone> authenticate(@RequestBody AuthenticationRequest authRequest){
        AuthenticationRespone result=authenticationService.authenticate(authRequest);
        return ApiRespone.<AuthenticationRespone>builder()
                .result(result)
                .build();
    }
    //đăng xuất
    @PostMapping("/log-out")
    ApiRespone<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logOut(request);
        return ApiRespone.<Void>builder()
                .build();
    }
//    @PostMapping("/refresh")
//    ApiRespone<AuthenticationRespone> logout(@RequestBody RefreshTokenRequest request) throws ParseException, JOSEException {
//        AuthenticationRespone newToken= authenticationService.refreshToken(request);
//        return ApiRespone.<AuthenticationRespone>builder()
//                .result(newToken)
//                .build();
//    }
    //kiểm tra token hợp lệ
    @PostMapping("/introspect")
    ApiRespone<IntrospectRespone> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        IntrospectRespone result=authenticationService.introspect(request);
        return ApiRespone.<IntrospectRespone>builder()
                .result(result)
                .build();
    }

}
