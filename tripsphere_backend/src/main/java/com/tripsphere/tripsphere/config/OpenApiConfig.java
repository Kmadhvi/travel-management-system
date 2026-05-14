package com.tripsphere.tripsphere.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    public OpenAPI customOpenAPI(){
        return new OpenAPI().info(new Info()
                .title("Tripsphere APIs")
                .version("1.0")
                .description("Corporate Travel Management System API documentation"));
//                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
//                .components(new Components()
//                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
//                                .name("bearerAuth")
//                                .type(SecurityScheme.Type.HTTP)
//                                .scheme("bearer")
//                                .bearerFormat("JWT")));
    }
}
