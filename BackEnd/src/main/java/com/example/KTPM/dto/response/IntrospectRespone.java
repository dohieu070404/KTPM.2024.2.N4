package com.example.KTPM.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data//tu dong tao getter setter va ...
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IntrospectRespone {
    boolean valid;
}
