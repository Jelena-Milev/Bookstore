package com.fon.njt.bookstorage.model;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "storage_item")
public class StorageItemEntity {

    @Id
    @EqualsAndHashCode.Include
    private Long bookId;
    private Integer piecesAvailable;
    private Integer piecesSold;
    private boolean inStock;
}
