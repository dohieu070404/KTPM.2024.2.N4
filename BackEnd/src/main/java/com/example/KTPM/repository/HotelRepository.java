package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<Hotel,Integer> {
    boolean existsByName(String s);
    Optional<User> findByName(String name);
}
