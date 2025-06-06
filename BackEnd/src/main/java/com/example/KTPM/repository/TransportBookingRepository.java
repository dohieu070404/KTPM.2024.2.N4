package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.RoomBooking;
import com.example.KTPM.entity.TransportBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransportBookingRepository extends JpaRepository<TransportBooking,Integer> {
    boolean existsById(Integer s);
    Optional<TransportBooking> findById(Integer id);

    @Query("SELECT tb FROM TransportBooking tb WHERE tb.user.name = :username AND tb.isDeleted = false")
    List<TransportBooking> findAllByUsername(@Param("username") String username);

}
