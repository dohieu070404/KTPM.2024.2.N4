package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.TransportCompany;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranSportCompanyRepository extends JpaRepository<TransportCompany,Integer> {
    boolean existsByName(String s);
    Optional<User> findByName(String name);
    @Query(value = "SELECT * FROM transport_company WHERE Create_User_Id = :userId;",nativeQuery = true)
    List<TransportCompany> findAllByUserId(@Param("userId") Integer userId);
}
