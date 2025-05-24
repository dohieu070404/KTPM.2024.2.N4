package com.example.KTPM.mapper;
import com.example.KTPM.dto.request.UserCreationRequest;
import com.example.KTPM.dto.request.UserUpdateRequest;
import com.example.KTPM.dto.response.UserRespone;
import com.example.KTPM.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel="spring")
public interface UserMapper {
    // Tạo User từ request
    @Mapping(target = "dob", source = "dob")
    User toUser(UserCreationRequest request);

    // Map User entity → DTO trả về cho client
    UserRespone toUserRespone(User user);

    // Cập nhật User từ request
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
