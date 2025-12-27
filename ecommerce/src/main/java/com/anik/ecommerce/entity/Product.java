package com.anik.ecommerce.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid default gen_random_uuid()")
    private UUID id;

    private String name;
    private String description;
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    private boolean active;
}
