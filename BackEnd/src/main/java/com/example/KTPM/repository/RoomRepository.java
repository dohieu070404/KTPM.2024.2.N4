package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.RoomType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<RoomType,Integer> {
    boolean existsByName(String s); 
    Optional<RoomType> findByName(String name);

    // Sắp xếp theo giá giảm dần
    @Query(value = "SELECT * FROM room_type ORDER BY Price DESC", nativeQuery = true)
    List<RoomType> findAllOrderByPriceDesc();

//    @Query(value = "SELECT * FROM room_type WHERE Hotels_Id =:hotelId;",nativeQuery = true)
//    List<RoomType> findAllByHotelId(@Param("hotelId") Integer hotelId);
    List<RoomType> findByHotelsId(Integer hotelId);
    //tổng giá phòng theo số lượng
    @Query(value = "SELECT Price * :quantity FROM room_type WHERE Id = :roomTypeId", nativeQuery = true)
    BigDecimal totalRoomPrice(@Param("roomTypeId") Integer roomTypeId, @Param("quantity") Integer quantity);

    // Cập nhật số phòng còn trống
    @Modifying
    @Transactional
    @Query(value = "UPDATE room_type SET Available_Rooms = Available_Rooms - :quantity WHERE Id = :roomTypeId", nativeQuery = true)
    void updateAvailableRooms(@Param("roomTypeId") Integer roomTypeId, @Param("quantity") Integer quantity);
}
