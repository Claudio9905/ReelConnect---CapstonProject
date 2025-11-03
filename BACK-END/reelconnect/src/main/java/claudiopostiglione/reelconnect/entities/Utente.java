package claudiopostiglione.reelconnect.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

// Questa entità mi serve per avere un instanza da passare nel metodo della creazione del TOKEN
// Tale entità sara completata in una branch apposita

@Entity
@Table(name = "utente")
@Getter
@Setter
@NoArgsConstructor
public class Utente {

    @Id
    @GeneratedValue
    private UUID id;


}
