package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.Transport;
import com.example.KTPM.entity.User;
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
public interface TranSportRepository extends JpaRepository<Transport,Integer> {
    boolean existsByName(String s);
    Optional<Transport> findByName(String name);
    //tổng giá chuyến xe theo số lượng ghế
    @Query(value = "SELECT Price * :quantity FROM transport WHERE Id = :transportId", nativeQuery = true)
    BigDecimal totalTransportPrice(@Param("transportId") Integer transportId, @Param("quantity") Integer quantity);
    // Cập nhật số ghế còn trống
    @Modifying
    @Transactional
    @Query(value = "UPDATE transport SET Available_Seats = Available_Seats - :quantity WHERE Id = :transportId", nativeQuery = true)
    void updateAvailableTransports(@Param("transportId") Integer transportId, @Param("quantity") Integer quantity);

    @Query("SELECT t FROM Transport t WHERE t.transportCompany.id = :companyId AND t.isActive = true")
    List<Transport> findAllByCompanyId(@Param("companyId") Integer companyId);

}
