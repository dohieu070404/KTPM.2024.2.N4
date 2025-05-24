package com.example.KTPM.service;

import com.example.KTPM.dto.request.AuthenticationRequest;
//import com.example.KTPM.dto.request.IntrospectRequest;
//import com.example.KTPM.dto.request.LogoutRequest;
//import com.example.KTPM.dto.request.RefreshTokenRequest;
import com.example.KTPM.dto.request.IntrospectRequest;
import com.example.KTPM.dto.request.LogoutRequest;
import com.example.KTPM.dto.response.AuthenticationRespone;
//import com.example.KTPM.dto.response.IntrospectRespone;
//import com.example.KTPM.entity.InvalidatedToken;
import com.example.KTPM.dto.response.IntrospectRespone;
import com.example.KTPM.entity.InvalidatedToken;
import com.example.KTPM.entity.User;
import com.example.KTPM.enums.Roles;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
//import com.example.KTPM.repository.InvalidateTokenRepository;
import com.example.KTPM.repository.InvalidateTokenRepository;
import com.example.KTPM.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    @Value("${jwt.signerKey}")//lay signerKey tu file yaml=
    protected String authenticationKey;
    @Value("${jwt.valid-duration}")//lay signerKey tu file yaml=
    protected long VALIDATION_DURATION;
    @Value("${jwt.refreshable-duration}")//lay signerKey tu file yaml=
    protected long REFRESHABLE_DURATION;

    private final UserRepository userRepository;
    private final InvalidateTokenRepository invalidateTokenRepository;
    //tao token
    public AuthenticationRespone authenticate(AuthenticationRequest authRequest) {
        var user=userRepository.findByName(authRequest.getUser())
                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);
        boolean match= passwordEncoder.matches(authRequest.getPassword(),user.getPassword());
        if(!match){
            throw new AppException(ErrorCode.USER_UNAUTHENTICATED);
        }
        return AuthenticationRespone.builder()
                .authenticated(true)
                .token(generateToken(user))
                .role(user.getRole().name())
                .build();
    }
    private String generateToken(User user) {
        JWSHeader jwsHeader=new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet=new JWTClaimsSet.Builder()
                .subject(user.getName())
                .issuer("KTPM.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALIDATION_DURATION,ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",buildScope(user))
                .build();
        Payload payload=new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject=new JWSObject(jwsHeader,payload);
        try {
            jwsObject.sign(new MACSigner(authenticationKey.getBytes()));//can thuat toan de ky token MacSigner
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    //Chuyển list các role của user thành dạng string với các role cách nhau bởi dấu cách vd:USER ADMIN
    private String buildScope(User user) {
        StringJoiner scope = new StringJoiner(" ");
        Roles role = user.getRole();

        if (role != null) {
            scope.add("ROLE_" + role.name()); // Chuyển enum thành chuỗi
        }
        return scope.toString();
    }

    //xac dinh token hop le
    public IntrospectRespone introspect(IntrospectRequest request) throws ParseException, JOSEException {
        var token=request.getToken();
        SignedJWT signedToken=verifyToken(token,false);
        String idToken=signedToken.getJWTClaimsSet().getJWTID();
        boolean flag=invalidateTokenRepository.existsById(idToken);
        return IntrospectRespone.builder()
                .valid(!flag)
                .build();

    }
    public void logOut(LogoutRequest request) throws ParseException, JOSEException {
        try {
            SignedJWT signedJWT=verifyToken(request.getToken(),true);
            String idToken=signedJWT.getJWTClaimsSet().getJWTID();
            Date expirationTime=signedJWT.getJWTClaimsSet().getExpirationTime();
            invalidateTokenRepository.save(
            InvalidatedToken.builder()
                    .id(idToken)
                    .expireTime(expirationTime)
                    .build()
            );
        } catch (AppException e) {
            log.info("Token already expired");
        }
    }
    //refresh token
//    public AuthenticationRespone refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException {
//        var verify=verifyToken(request.getToken(),true);
//        String idToken=verify.getJWTClaimsSet().getJWTID();
//        Date expirationTime=verify.getJWTClaimsSet().getExpirationTime();
//        //log out token cu
//        invalidateTokenRepository.save(
//                InvalidatedToken.builder()
//                        .id(idToken)
//                        .expireTime(expirationTime)
//                        .build()
//        );
//        //generate token
//        var username=verify.getJWTClaimsSet().getSubject();
//        var user=userRepository.findByUsername(username)
//                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
//        return AuthenticationRespone.builder()
//                .authenticated(true)
//                .token(generateToken(user))
//                .build();
//
//    }
    private SignedJWT verifyToken(String token,boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier=new MACVerifier(authenticationKey.getBytes());
        SignedJWT signedJWT=SignedJWT.parse(token);
        Date expirationTime;
        if(isRefresh){
             expirationTime=new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli());
        }else{
             expirationTime=signedJWT.getJWTClaimsSet().getExpirationTime();
        }
        var verify=signedJWT.verify(verifier);
        if(!(verify && expirationTime.after(new Date()))){
            throw new AppException(ErrorCode.USER_UNAUTHENTICATED);
        }
        return signedJWT;
    }

}
