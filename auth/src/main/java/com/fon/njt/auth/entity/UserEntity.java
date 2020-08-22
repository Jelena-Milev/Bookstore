package com.fon.njt.auth.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
@Entity
@Table(name="user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
//    private String email;
    private String firstName;
    private String lastName;
    private String role;

    private String streetNameAndNumber;
    private String phone;
    private String zipCode;
    private String city;

}
