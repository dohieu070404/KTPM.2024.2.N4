package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.HotelImage;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelImagesRepository extends JpaRepository<HotelImage,Integer> {
//    boolean existsByName(String s);
//    Optional<HotelImage> findByName(String name);

    @Query(value = "SELECT * FROM hotel_images WHERE Hotels_Id = :hotelId;",nativeQuery = true)
    List<HotelImage> findAllByHotelId(@Param("hotelId") Integer hotelId);
}
