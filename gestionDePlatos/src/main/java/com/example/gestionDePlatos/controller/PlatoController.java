/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.gestionDePlatos.controller;

import com.example.gestionDePlatos.model.Plato;
import com.example.gestionDePlatos.service.PlatoService;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



/**
 *
 * @author user
 */


@RestController
@RequestMapping("/api/platos")
@CrossOrigin("*")
public class PlatoController {
    
    @Autowired
    private PlatoService platoService ;
    
    
    @PostMapping()
    public Plato createPlato(@RequestBody Plato plato) {
        return platoService.savePlato(plato);
    }
    
    @GetMapping()
    public List<Plato> getAllPlatos() {
        return platoService.getAllPlatos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Plato> getPlatoById(@PathVariable Long id) {
        Plato plato = platoService.getPlatoById(id);
        return plato != null ? ResponseEntity.ok(plato) : ResponseEntity.notFound().build();
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Plato> updatePlato(@PathVariable Long id, @RequestBody Plato plato) {
        Plato platoUpdate = platoService.updatePlato(id, plato);
        return ResponseEntity.ok(platoUpdate);
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlato(@PathVariable Long id) {
        platoService.deletePlato(id);
        return ResponseEntity.ok().build();
    }
    
}
