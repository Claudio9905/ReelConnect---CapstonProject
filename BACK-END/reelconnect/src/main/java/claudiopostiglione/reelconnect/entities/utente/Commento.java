package claudiopostiglione.reelconnect.entities.utente;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "commento")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Commento {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "descrizione")
    private String descrizione;
    @Column(name = "data_creazione_commento")
    private LocalDate dataCreazioneCommento;


    @ManyToOne
    @JoinColumn(name = "post")
    @JsonBackReference
    private Post post;

    @ManyToOne
    @JoinColumn(name = "utente")
    private Utente utente;

    //Costruttori
    public Commento(String descrizione, Post post, Utente utente){
        this.descrizione = descrizione;
        this.dataCreazioneCommento = LocalDate.now();
        this.post = post;
        this.utente = utente;
    }

}
