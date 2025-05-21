package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomBookingRepository extends JpaRepository<RoomBooking,Integer> {
    boolean existsById(Integer s);
    Optional<RoomBooking> findById(Integer id);

    @Query("SELECT rb FROM RoomBooking rb WHERE rb.user.name = :username AND rb.isDeleted = false")
    List<RoomBooking> findAllByUsername(@Param("username") String username);
}

