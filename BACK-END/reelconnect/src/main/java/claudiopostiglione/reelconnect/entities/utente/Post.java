package claudiopostiglione.reelconnect.entities.utente;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "post")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Post {
    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "descrizione")
    private String descrizione;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "data_creazione_post")
    private LocalDateTime dataCreazionePost;
    @Column(name = "num_ciak")
    private long numCiak;

    @ManyToOne
    @JoinColumn(name = "utente")
    private Utente utente;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Commento> listaCommenti = new ArrayList<>();

    //Costruttori
    public Post(String descrizione, Utente utente, String imageUrl) {
        this.descrizione = descrizione;
        this.dataCreazionePost = LocalDateTime.now();
        this.utente = utente;
        this.imageUrl = imageUrl;
    }
}
