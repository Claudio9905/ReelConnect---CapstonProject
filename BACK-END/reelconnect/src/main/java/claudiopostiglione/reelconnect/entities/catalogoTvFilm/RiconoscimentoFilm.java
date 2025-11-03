package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "RiconoscimentoFilm")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class RiconoscimentoFilm {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "nomeRiconoscimento")
    private String nome;
    @Column(name = "anno")
    private int anno;
    @Column(name = "tipoRiconoscimento")
    @Enumerated(EnumType.STRING)
    private TipoRiconoscimentoFilm tipo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "film")
    private Film film;

    //Costruttori
    public RiconoscimentoFilm(String nome, int anno, TipoRiconoscimentoFilm tipo) {
        this.nome = nome;
        this.anno = anno;
        this.tipo = tipo;
    }
}
