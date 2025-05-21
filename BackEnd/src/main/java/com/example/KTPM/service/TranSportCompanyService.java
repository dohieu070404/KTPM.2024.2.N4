package com.example.KTPM.service;

import com.example.KTPM.dto.request.TranSportCompanyRequest;
import com.example.KTPM.dto.response.TranSportCompanyRespone;
import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.User;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.TranSportCompanyMapper;
import com.example.KTPM.repository.TranSportCompanyRepository;
import com.example.KTPM.repository.RoomRepository;
import com.example.KTPM.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TranSportCompanyService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TranSportCompanyMapper tranSportCompanyMapper;
    @Autowired
    private TranSportCompanyRepository tranSportCompanyRepository;

    public TranSportCompanyRespone createTranSportCompany(TranSportCompanyRequest request) {
        log.info("Service: Create tranSportCompany");
        if (tranSportCompanyRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.COMPANY_EXISTED);
        }
        TransportCompany tranSportCompany = tranSportCompanyMapper.toTranSportCompany(request);
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer id = user.getId();
        tranSportCompany.setCreateUserId(id);
        tranSportCompany.setIsActive(true);
        return tranSportCompanyMapper.toTranSportCompanyRespone(tranSportCompanyRepository.save(tranSportCompany));
    }

    public List<TranSportCompanyRespone> getMyTranSportCompany() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Integer id = user.getId();
        return tranSportCompanyRepository.findAllByUserId(id).stream().map(tranSportCompanyMapper::toTranSportCompanyRespone).toList();
    }

    public TranSportCompanyRespone updateTransportCompany(Integer id, TranSportCompanyRequest request) {
        TransportCompany company = tranSportCompanyRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_COMPANY_NOT_EXISTED));

        // Kiểm tra quyền sửa (chỉ người tạo được sửa)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (!company.getCreateUserId().equals(user.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        tranSportCompanyMapper.updateTranSportCompany(company, request);
        company.setUpdatedAt(Instant.now());
        return tranSportCompanyMapper.toTranSportCompanyRespone(tranSportCompanyRepository.save(company));
    }

    public void deleteTransportCompany(Integer id) {
        TransportCompany company = tranSportCompanyRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.TRANSPORT_COMPANY_NOT_EXISTED));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByName(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (!company.getCreateUserId().equals(user.getId())) {
            throw new AppException(ErrorCode.USER_NOT_OWNER);
        }

        company.setIsActive(false);
        company.setUpdatedAt(Instant.now());
        tranSportCompanyRepository.save(company);
    }


}
