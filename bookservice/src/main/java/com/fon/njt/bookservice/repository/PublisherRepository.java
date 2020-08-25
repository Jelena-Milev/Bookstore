package com.fon.njt.bookservice.repository;

import com.fon.njt.bookservice.model.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {

    List<PublisherEntity> findAllByOrderByNameAsc();

    boolean existsByName(String name);
}
