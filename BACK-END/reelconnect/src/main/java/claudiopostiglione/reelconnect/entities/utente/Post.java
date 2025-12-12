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
    @Column(name = "num_commenti")
    private long numCommenti;

    @ManyToOne
    @JoinColumn(name = "utente")
    private Utente utente;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Commento> listaCommenti = new ArrayList<>();

    //Costruttori
    public Post(String descrizione, Utente utente, String imageUrl) {
        this.descrizione = descrizione;
        this.dataCreazionePost = LocalDateTime.now();
        this.utente = utente;
        this.imageUrl = imageUrl;
        this.numCiak = 0;
        this.numCommenti = getNumCommenti();
    }

    public UUID getId() {
        return id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public LocalDateTime getDataCreazionePost() {
        return dataCreazionePost;
    }

    public long getNumCiak() {
        return numCiak;
    }

    public long getNumCommenti() {
        return listaCommenti != null ? listaCommenti.size() : 0;
    }

    public Utente getUtente() {
        return utente;
    }

    public List<Commento> getListaCommenti() {
        return listaCommenti;
    }
}
