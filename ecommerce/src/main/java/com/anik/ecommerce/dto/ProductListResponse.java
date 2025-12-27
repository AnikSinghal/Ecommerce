package com.anik.ecommerce.dto;

import java.util.List;

public record ProductListResponse(
    List<ProductResponse> products,
    long total
) {}
