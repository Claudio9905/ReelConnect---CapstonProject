package claudiopostiglione.reelconnect.entities.catalogoTvFilm;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "riconoscimentoAttore")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RiconoscimentoAttore {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "anno")
    private LocalDate anno;
    @Column(name = "tipoRiconoscimento")
    @Enumerated(EnumType.STRING)
    private RiconoscimentoAttore tipoRiconoscimento;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "attore")
    private Attore attore;

    //Construttori
    public RiconoscimentoAttore(String nome, LocalDate anno, RiconoscimentoAttore tipoRiconoscimento, Attore attore) {
        this.nome = nome;
        this.anno = anno;
        this.tipoRiconoscimento = tipoRiconoscimento;
        this.attore = attore;
    }
}
