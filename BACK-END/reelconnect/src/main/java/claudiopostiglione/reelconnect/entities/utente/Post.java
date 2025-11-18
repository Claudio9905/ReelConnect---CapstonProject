package claudiopostiglione.reelconnect.entities.utente;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    private LocalDate dataCreazionePost;

    @ManyToOne
    @JoinColumn(name = "utente")
    private Utente utente;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Commento> listaCommenti = new ArrayList<>();

    //Costruttori
    public Post(String descrizione, String imageUrl, Utente utente){
        this.descrizione = descrizione;
        this.imageUrl = imageUrl;
        this.dataCreazionePost = LocalDate.now();
        this.utente = utente;
    }
}
