package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    @JsonIgnore
    @OneToMany(mappedBy = "regista")
    private List<CatalogoTvFilm> catalogo;

    //Costruttori
    public Regista(String nome, String cognome, List<CatalogoTvFilm> catalogo) {
        this.nome = nome;
        this.cognome = cognome;
        this.catalogo = catalogo;
    }
}
