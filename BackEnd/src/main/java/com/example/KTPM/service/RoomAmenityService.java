package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomAmenityRequest;
import com.example.KTPM.dto.response.RoomAmenityRespone;
import com.example.KTPM.entity.RoomAmenity;
import com.example.KTPM.mapper.RoomAmenityMapper;
import com.example.KTPM.repository.RoomAmenityRepository;
import com.example.KTPM.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomAmenityService {
    @Autowired
    private RoomAmenityRepository roomAmenityRepository;
    @Autowired
    private RoomAmenityMapper roomAmenityMapper;

    public RoomAmenityRespone create(RoomAmenityRequest request){
        var roomAmenity = roomAmenityMapper.toRoomAmenity(request);
        return roomAmenityMapper.toRoomAmenityResponse(roomAmenityRepository.save(roomAmenity));
    }
    public RoomAmenityRespone updateRoomAmenity(String id, RoomAmenityRequest request){
        RoomAmenity tmp=roomAmenityRepository.findByName(id).orElseThrow(()->new RuntimeException("Amenity not found"));
        tmp.setDescription(request.getDescription());
        tmp.setIcon(request.getIcon());
        return roomAmenityMapper.toRoomAmenityResponse(roomAmenityRepository.save(tmp));
    }
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<RoomAmenityRespone> getAllRoomAmenitys() {
        return roomAmenityRepository.findAll().stream().map(roomAmenityMapper::toRoomAmenityResponse).toList();
    }
    public void deleteRoomAmenity(String name){
        roomAmenityRepository.findById(name).orElseThrow(()->new RuntimeException("Room amenity not found"));
        roomAmenityRepository.deleteById(name);
    }

}
