package com.wendellyv.financialmanager.resources;

import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"/incomes", "/incomes/"})
public class IncomeResource {

    @Autowired
    private IncomeService incomeService;

    @GetMapping
    public ResponseEntity<List<Income>> findAll() {
        List<Income> list = incomeService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Income> findById(@PathVariable Long id) {
        Income obj = incomeService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
}
