package com.fon.njt.zuul.security;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity 	// Enable security config. This annotation denotes config for spring security.
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*http
                .csrf().disable()
                // make sure we use stateless session; session won't be used to store user's state.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // handle an authorized attempts
                .exceptionHandling().authenticationEntryPoint((req, res, e) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                // Add a filter to validate the tokens with every request
                .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                // authorization requests config
                .authorizeRequests()
                // allow all who are accessing "auth" service
                .antMatchers(HttpMethod.POST, "/auth/**").permitAll()
                //.and().authorizeRequests()
                // must be an admin if trying to access admin area (authentication is also required here)
                .antMatchers(HttpMethod.POST, "/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/books/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/books/**").hasRole("ADMIN")
                .antMatchers("/book-storage/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST,"/book-orders/**").hasRole("USER")

                // Any other request must be authenticated
                .anyRequest().authenticated();*/

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

//    @Override
//    @Bean
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
}
