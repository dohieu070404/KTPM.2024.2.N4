package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.OrderDetail;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByName(String s);
    Optional<User> findByName(String name);
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByEmail(String email);
    @Query(value = "SELECT * FROM user WHERE Customer ='pending'", nativeQuery = true)
    List<User> findAllRequest();
}
