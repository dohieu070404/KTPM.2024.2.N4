package com.example.KTPM.service;

import com.example.KTPM.dto.request.RoomRequest;
import com.example.KTPM.dto.request.SearchRequest;
import com.example.KTPM.dto.response.HotelRespone;
import com.example.KTPM.dto.response.RoomRespone;
import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.exception.AppException;
import com.example.KTPM.exception.ErrorCode;
import com.example.KTPM.mapper.RoomMapper;
import com.example.KTPM.repository.HotelRepository;
import com.example.KTPM.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomMapper roomMapper;
    @Autowired
    private RoomRepository roomRepository;

    public RoomRespone createRoom(Integer id,RoomRequest request) {
        log.info("Service: Create Room");
        
        if (roomRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }

        Hotel hotel = hotelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        RoomType room = roomMapper.toRoomType(request);
        room.setHotels(hotel);

        return roomMapper.toRoomRespone(roomRepository.save(room));

    }

    public List<RoomRespone> getHotelRoom(Integer hotelId){
        log.info("Service: Get all rooms for hotel id {}", hotelId);
        hotelRepository.findById(hotelId)
            .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        List<RoomType> rooms = roomRepository.findByHotelsId(hotelId);
        return rooms.stream()
            .map(roomMapper::toRoomRespone)
            .toList();
    }
   
    // public List<RoomRespone> getFilterByRating() {
    //     return roomRepository.findAllByRating().stream().map(roomMapper::toRoomRespone).toList();
    // }

    public RoomRespone updateRoom(Integer hotelId, Integer roomId, RoomRequest request) {
        RoomType room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        if (!room.getHotels().getId().equals(hotelId)) {
            throw new AppException(ErrorCode.ROOM_NOT_EXISTED);
        }

        roomMapper.updateRoom(room, request);
        return roomMapper.toRoomRespone(roomRepository.save(room));
    }

    public void deleteRoom(Integer hotelId, Integer roomId) {
        RoomType room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        if (!room.getHotels().getId().equals(hotelId)) {
            throw new AppException(ErrorCode.ROOM_NOT_EXISTED);
        }

        roomRepository.delete(room);
    }

    // sắp xếp theo giá giảm dần
    public List<RoomRespone> getRoomsSortedByPrice() {
        return roomRepository.findAllOrderByPriceDesc()
                .stream()
                .map(roomMapper::toRoomRespone)
                .toList();
    }
    public RoomRespone getRoom(Integer id) {
        return roomMapper.toRoomRespone(roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED)));
    }

    public List<RoomRespone> searchRooms(SearchRequest request) {
        return roomRepository.findAll().stream()
            .filter(room -> {
                Hotel hotel = room.getHotels();

                boolean locationMatch = hotel.getCity().equalsIgnoreCase(request.getLocation());
                boolean adultsOK = room.getMaxAdults() >= request.getMaxAdults();
                boolean childrenOK = room.getMaxChildren() >= request.getMaxChildren();
                boolean priceOK = true;
                if (request.getMinPrice() != null && room.getPrice().compareTo(BigDecimal.valueOf(request.getMinPrice())) < 0)
                    priceOK = false;
                if (request.getMaxPrice() != null && room.getPrice().compareTo(BigDecimal.valueOf(request.getMaxPrice())) > 0)
                    priceOK = false;

                return locationMatch && adultsOK && childrenOK && priceOK;
            })
            .sorted((a, b) -> {
                if (request.getSortBy() == null) return 0;
                return switch (request.getSortBy()) {
                    case "priceAsc" -> a.getPrice().compareTo(b.getPrice());
                    case "priceDesc" -> b.getPrice().compareTo(a.getPrice());
                    case "newest" -> b.getCreatedAt().compareTo(a.getCreatedAt());
                    case "oldest" -> a.getCreatedAt().compareTo(b.getCreatedAt());
                    case "rating" -> {
                        Integer r1 = a.getHotels().getRating() != null ? a.getHotels().getRating().intValue() : 0;
                        Integer r2 = b.getHotels().getRating() != null ? b.getHotels().getRating().intValue() : 0;
                        yield r2.compareTo(r1); // rating giảm dần
                    }
                    default -> 0;
                };
            })
            .map(roomMapper::toRoomRespone)
            .toList();
    }

}
