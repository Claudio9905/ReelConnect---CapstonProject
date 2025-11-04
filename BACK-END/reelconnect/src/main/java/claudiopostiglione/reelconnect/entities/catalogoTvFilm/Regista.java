package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "regista")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Regista {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "cognome")
    private String cognome;
    @Column(name = "età")
    private int eta;
    @Column(name = "dataDiNascita")
    private LocalDate dataDiNascita;
    @Column(name = "immagineProfiloUrl")
    private String immagineProfilo;

    @OneToMany(mappedBy = "regista")
    private List<CatalogoTvFilm> catalogo;

    //Costruttori
    public Regista(String nome, String cognome, int eta, LocalDate dataDiNascita) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
        this.dataDiNascita = dataDiNascita;
//        this.catalogo = catalogo;
    }
}
