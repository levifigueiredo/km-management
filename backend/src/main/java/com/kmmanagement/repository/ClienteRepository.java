package com.kmmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kmmanagement.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
