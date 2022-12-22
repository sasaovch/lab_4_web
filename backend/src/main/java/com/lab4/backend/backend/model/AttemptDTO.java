package com.lab4.backend.backend.model;

import lombok.Data;

@Data
public class AttemptDTO {
    private Attempt attempt;
    private String jwtToken;
}
