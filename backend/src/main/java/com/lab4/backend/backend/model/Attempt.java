package com.lab4.backend.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private Date date;
    // join column with user
    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Attempt [id=" + id + ", x=" + x + ", y=" + y + ", r=" + r + ", hit=" + hit + ", date=" + date + "]";
    }
}
