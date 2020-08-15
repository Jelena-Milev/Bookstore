package com.fon.njt.bookstorage.repository;

import com.fon.njt.bookstorage.model.StorageItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StorageItemRepository extends JpaRepository<StorageItemEntity, Long> {

    @Query(nativeQuery = true, value = "SELECT book_id FROM storage_item s WHERE in_stock = true ORDER BY pieces_sold DESC LIMIT :numberOfBestsellers")
    List<Long> getBestSellerIds(@Param("numberOfBestsellers") Integer numberOfBestsellers);

    boolean existsByBookId(Long bookId);

    List<StorageItemEntity> findByBookIdInAndInStockTrue(List<Long> ids);
}
