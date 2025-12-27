package com.anik.ecommerce.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductResponse(
    UUID id,
    String name,
    String description,
    BigDecimal price,
    String image,
    String category,
    boolean inStock,
    double rating,
    int reviewCount
) {}
