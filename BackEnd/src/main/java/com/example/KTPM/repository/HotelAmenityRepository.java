package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.HotelAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface HotelAmenityRepository extends JpaRepository<HotelAmenity,String> {
    Optional<HotelAmenity> findByName(String s);

    List<HotelAmenity> findAllByNameIn(Set<String> names);
}

