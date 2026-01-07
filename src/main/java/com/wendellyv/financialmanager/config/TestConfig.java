package com.wendellyv.financialmanager.config;

import com.wendellyv.financialmanager.entities.User;
import com.wendellyv.financialmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User u1  = new User(null, "Caio", "caio232@gmail.com","61912345");
        User u2  = new User(null, "Maria", "maria54@gmail.com","245675643d");

        userRepository.saveAll(Arrays.asList(u1, u2));
    }
}
