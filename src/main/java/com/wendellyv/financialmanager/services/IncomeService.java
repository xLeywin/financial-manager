package com.wendellyv.financialmanager.services;

import com.wendellyv.financialmanager.entities.Income;
import com.wendellyv.financialmanager.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> findAll() {
        return incomeRepository.findAll();
    }

    public Income findById(Long id) {
        Optional<Income> income = incomeRepository.findById(id);
        return income.get();
    }
}
