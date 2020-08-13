package com.fon.njt.bookstorage;

import com.fon.njt.bookstorage.model.StorageItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageItemRepository extends JpaRepository<StorageItemEntity, Long> {
}
