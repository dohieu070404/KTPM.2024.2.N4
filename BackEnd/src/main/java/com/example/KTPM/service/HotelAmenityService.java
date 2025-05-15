package com.example.KTPM.service;

import com.example.KTPM.dto.request.HotelAmenityRequest;
import com.example.KTPM.dto.response.HotelAmenityRespone;
import com.example.KTPM.entity.HotelAmenity;
import com.example.KTPM.mapper.HotelAmenityMapper;
import com.example.KTPM.repository.HotelAmenityRepository;
import com.example.KTPM.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HotelAmenityService {
    @Autowired
    private HotelAmenityRepository hotelAmenityRepository;
    @Autowired
    private HotelAmenityMapper hotelAmenityMapper;
    @Autowired
    private PermissionRepository permissionRepository;

    public HotelAmenityRespone create(HotelAmenityRequest request){
        var hotelAmenity = hotelAmenityMapper.toHotelAmenity(request);
        return hotelAmenityMapper.toHotelAmenityResponse(hotelAmenityRepository.save(hotelAmenity));
    }
    public HotelAmenityRespone updateHotelAmenity(String id, HotelAmenityRequest request){
        HotelAmenity tmp=hotelAmenityRepository.findByName(id).orElseThrow(()->new RuntimeException("Amenity not found"));
        tmp.setDescription(request.getDescription());
        tmp.setIcon(request.getIcon());
        return hotelAmenityMapper.toHotelAmenityResponse(hotelAmenityRepository.save(tmp));
    }
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<HotelAmenityRespone> getAllHotelAmenitys() {
        return hotelAmenityRepository.findAll().stream().map(hotelAmenityMapper::toHotelAmenityResponse).toList();
    }
    public void deleteHotelAmenity(String name){
        hotelAmenityRepository.findById(name).orElseThrow(()->new RuntimeException("Hotel amenity not found"));
        hotelAmenityRepository.deleteById(name);
    }

}
