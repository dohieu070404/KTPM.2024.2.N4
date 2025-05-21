package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomImagesRepository extends JpaRepository<RoomImage,Integer> {
//    boolean existsByName(String s);
//    Optional<HotelImage> findByName(String name);

    @Query(value = "SELECT * FROM room_images WHERE  Room_Type_Id  = :roomId;",nativeQuery = true)
    List<RoomImage> findAllByRoomId(@Param("roomId") Integer roomId);
}
