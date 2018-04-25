package com.restservice.archimedes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ArchimedesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArchimedesApplication.class, args);
	}
}
