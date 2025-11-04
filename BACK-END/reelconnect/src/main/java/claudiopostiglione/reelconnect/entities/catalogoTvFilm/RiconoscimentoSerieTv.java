package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "RiconscimentoSerieTv")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RiconoscimentoSerieTv {

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
    private TipoRiconoscimentoSerieTv tipo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "serieTv")
    private SerieTv serieTv;

    //Costruttori
    public RiconoscimentoSerieTv(String nome, int anno, TipoRiconoscimentoSerieTv tipo) {
        this.nome = nome;
        this.anno = anno;
        this.tipo = tipo;
    }
}
