
package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.OrderDetail;
import com.example.KTPM.entity.TransportBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    Optional<OrderDetail> findById(Integer s);
    @Query(value = "SELECT * FROM order_details WHERE Order_Id = :id", nativeQuery = true)
    List<OrderDetail> findAllByOrderId(@Param("id") Integer id);
}

