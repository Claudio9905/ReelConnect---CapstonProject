package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "attore")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Attore {
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

    @OneToMany(mappedBy = "attore")
    @Column(name = "riconoscimenti")
    private List<RiconoscimentoAttore> listaRiconoscimenti = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "attore")
    private List<CatalogoTvFilm> carriera;

    //Costruttori
    public Attore(String nome, String cognome, int eta, LocalDate dataDiNascita, List<RiconoscimentoAttore> listaRiconoscimenti) {
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
        this.dataDiNascita = dataDiNascita;
        this.listaRiconoscimenti = listaRiconoscimenti;
    }
}
