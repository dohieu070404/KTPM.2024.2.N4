package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.RoomType;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
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
}
