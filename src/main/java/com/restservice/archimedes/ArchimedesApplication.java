package com.restservice.archimedes;

import com.restservice.archimedes.property.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class ArchimedesApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArchimedesApplication.class, args);
    }
}
