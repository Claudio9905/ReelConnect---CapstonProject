package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, UUID> {
}
