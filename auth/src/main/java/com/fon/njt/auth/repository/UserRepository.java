package com.fon.njt.auth.repository;

import com.fon.njt.auth.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByIdentifier(String identifier);

    boolean existsByUsername(String username);

    @Query(nativeQuery = true, value = "SELECT identifier FROM user u WHERE u.username=:username")
    String getId(@Param("username") String username);
}
