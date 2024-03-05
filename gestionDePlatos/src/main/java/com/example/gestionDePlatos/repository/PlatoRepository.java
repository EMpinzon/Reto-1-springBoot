/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.gestionDePlatos.repository;

import com.example.gestionDePlatos.model.Plato;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author user
 */
public interface PlatoRepository extends JpaRepository<Plato,Long> {
    
    
    
}
