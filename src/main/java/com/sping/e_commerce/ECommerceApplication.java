   package com.sping.e_commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.spring")
@EntityScan(basePackages = {"com.spring"})
public class ECommerceApplication{

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}

}
