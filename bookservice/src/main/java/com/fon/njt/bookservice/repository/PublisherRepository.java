package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {

    boolean existsByName(String name);
}
