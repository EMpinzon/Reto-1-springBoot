/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.gestionDePlatos.service;

import com.example.gestionDePlatos.model.Plato;
import com.example.gestionDePlatos.repository.PlatoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author user
 */
@Service
public class PlatoService {
    
    
    @Autowired
    private PlatoRepository platoRepository;
    
    
    
    public Plato savePlato(Plato plato){
        
        return platoRepository.save(plato);
        
        
    }
    
     public List<Plato> getAllPlatos(){
        return platoRepository.findAll();
    }
     
     
    public Plato getPlatoById(Long id) {
      return platoRepository.findById(id).orElse(null);
    }
    
    
    public void deletePlato(Long id) {
        platoRepository.deleteById(id);
    }
    
    
    public Plato updatePlato(Long id, Plato platoUpdate) {
        return platoRepository.findById(id).map(plato -> {
            plato.setNombre(platoUpdate.getNombre());
            plato.setDescripcion(platoUpdate.getDescripcion());
            plato.setPrecio(platoUpdate.getPrecio());
            
            return platoRepository.save(plato);
        }).orElseGet(() -> {
            platoUpdate.setId(id);
            return platoRepository.save(platoUpdate);
        });
    }
    
}
