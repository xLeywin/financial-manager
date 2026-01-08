package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Expense;
import com.wendellyv.financialmanager.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    public Expense findById(Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.get();
    }
}
