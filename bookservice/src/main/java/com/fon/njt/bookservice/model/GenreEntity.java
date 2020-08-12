package com.fon.njt.bookservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "genre")
public class GenreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @EqualsAndHashCode.Include
    private String name;

    @ManyToMany(mappedBy = "genres")
//    @JoinTable(name = "books_genres",
//            joinColumns = @JoinColumn(name="genre_id"),
//            inverseJoinColumns = @JoinColumn(name="book_id"))
    private Set<BookEntity> books;
}
