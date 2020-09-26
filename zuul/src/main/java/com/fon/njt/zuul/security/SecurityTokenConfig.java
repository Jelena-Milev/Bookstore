package com.fon.njt.zuul.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity 	// Enable security config. This annotation denotes config for spring security.
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/bookstore/api/auth").permitAll()
                .antMatchers(HttpMethod.POST, "/bookstore/api/auth/verification/**").permitAll()
                .antMatchers(HttpMethod.POST, "/bookstore/api/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/bookstore/api/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/bookstore/api/books/**").hasRole("ADMIN")
                .antMatchers("/bookstore/api/book-storage/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/bookstore/api/book-orders/**").hasRole("USER")
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JwtConfig jwtConfig() {
        return new JwtConfig();
    }
}
