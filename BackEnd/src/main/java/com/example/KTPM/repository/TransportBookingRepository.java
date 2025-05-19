package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.TransportBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransportBookingRepository extends JpaRepository<TransportBooking,Integer> {
    boolean existsById(Integer s);
    Optional<TransportBooking> findById(Integer id);
}
