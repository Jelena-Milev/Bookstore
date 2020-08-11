package com.fon.njt.bookservice.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "book")
public class BookEntity {

    @Id
    @SequenceGenerator(name = "book_id", sequenceName = "book_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_id")
    private Long id;

    @EqualsAndHashCode.Include
    private String ISBN;

    private String title;
    private BigDecimal price;
    private Integer numberOfPages;
    private String binding;
    private Integer publicationYear;
    private String description;

    private boolean inStock;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private PublisherEntity publisher;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "books_genres",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<GenreEntity> genres;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name="books_authors",
    joinColumns = @JoinColumn(name="book_id"),
    inverseJoinColumns = @JoinColumn(name="author_id"))
    private Set<AuthorEntity> authors;

    public void addAuthor(AuthorEntity author){
        this.authors.add(author);
        author.getBooks().add(this);
    }
}
