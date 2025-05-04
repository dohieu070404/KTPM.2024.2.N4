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
    @Mapping(target = "dob", source = "dob")
//    @Mapping(target = "isDeleted", source = "isDeleted", defaultValue = "false")
    User toUser(UserCreationRequest request);
    UserRespone toUserRespone(User user);
//    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
