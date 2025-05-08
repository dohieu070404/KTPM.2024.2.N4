package com.example.KTPM.repository;//class repository de tuong tac voi dpms o day la JPA

import com.example.KTPM.entity.Role;
import com.example.KTPM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
    Optional<Role> findByName(String s);
}

