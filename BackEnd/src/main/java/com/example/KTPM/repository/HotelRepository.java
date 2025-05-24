package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Hotel;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<Hotel,Integer> {
    boolean existsByName(String s);
    Optional<User> findByName(String name);
    @Query(value = "SELECT * FROM hotels ORDER BY Rating DESC",nativeQuery = true)
    List<Hotel> findAllByRating();
    @Query(value = "SELECT * FROM hotels WHERE Create_User_Id = :userId;",nativeQuery = true)
    List<Hotel> findAllByUserId(@Param("userId") Integer userId);

    @Query(value = "SELECT * FROM hotels WHERE (Price BETWEEN :minPrice AND :maxPrice) " +
                   "AND (Rating >= :rating OR :rating IS NULL) " +
                   "AND (Location LIKE %:location% OR :location IS NULL) " +
                   "ORDER BY CASE WHEN :sortBy = 'newest' THEN Created_At END DESC, " +
                   "CASE WHEN :sortBy = 'oldest' THEN Created_At END ASC, " +
                   "CASE WHEN :sortBy = 'price' THEN Price END ASC", nativeQuery = true)
    // Method to filter hotels based on price, rating, location, and sort order
    Optional<User> getFilteredHotels(Integer minPrice, Integer maxPrice, String sortBy, Integer rating, String location);
}
