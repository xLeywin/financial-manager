package com.wendellyv.financialmanager.resources;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.services.ExpenseService;
import com.wendellyv.financialmanager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = {"/expenses", "/expenses/"})
public class ExpenseResource {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> findAll(){
        List<Expense> list = expenseService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Expense> findById(@PathVariable Long id){
        Expense obj = expenseService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
}
