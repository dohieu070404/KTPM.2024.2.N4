package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.HotelAmenity;
import com.example.KTPM.entity.RoomAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomAmenityRepository extends JpaRepository<RoomAmenity,String> {
    Optional<RoomAmenity> findByName(String s);
}

