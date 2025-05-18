package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomBookingRepository extends JpaRepository<RoomBooking,Integer> {
    boolean existsById(Integer s);
    Optional<RoomBooking> findById(Integer id);
}
