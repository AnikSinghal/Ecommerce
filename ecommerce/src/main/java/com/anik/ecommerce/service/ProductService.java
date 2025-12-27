package com.anik.ecommerce.service;

import com.anik.ecommerce.dto.ProductListResponse;
import com.anik.ecommerce.dto.ProductResponse;
import com.anik.ecommerce.entity.Product;
import com.anik.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductListResponse getAllProducts() {
        List<Product> entities = productRepository.findByActiveTrue();

        List<ProductResponse> products = entities.stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        "oils", // static for now
                        true, // inStock
                        4.5, // rating (temp)
                        10 // reviewCount (temp)
                ))
                .toList();

        return new ProductListResponse(products, products.size());
    }

}
