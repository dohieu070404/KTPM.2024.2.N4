package com.example.KTPM.service;

import com.example.KTPM.dto.request.HotelImagesRequest;
import com.example.KTPM.dto.response.HotelImagesRespone;
import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.HotelImagesMapper;
import com.example.KTPM.mapper.HotelMapper;
import com.example.KTPM.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HotelImagesService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HotelImagesRepository hotelImagesRepository;
    @Autowired
    private HotelMapper hotelMapper;
    @Autowired
    private HotelImagesMapper hotelImagesMapper;
    @Autowired
    private HotelRepository hotelRepository;

    public HotelImagesRespone createHotelImage(Integer id,HotelImagesRequest request){
        log.info("Service: Create hotel");
        HotelImage hotelImage=hotelImagesMapper.toHotelImage(request);
        hotelImage.setHotels(hotelRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED)));
        return hotelImagesMapper.toHotelImagesRespone(hotelImagesRepository.save(hotelImage));
    }
    public List<HotelImagesRespone> getMyHotelImage(Integer hotelId){
        return hotelImagesRepository.findAllByHotelId(hotelId).stream().map(hotelImagesMapper::toHotelImagesRespone).toList();
    }

    public HotelImagesRespone updateHotelImage(Integer id, HotelImagesRequest request){
        HotelImage tmp=hotelImagesRepository.findById(id)
            .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        hotelImagesMapper.updateHotelImage(tmp, request);
        return hotelImagesMapper.toHotelImagesRespone(hotelImagesRepository.save(tmp));
    }

    public void deleteHotelImage(Integer id){
        hotelImagesRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        hotelImagesRepository.deleteById(id);
    }
}
