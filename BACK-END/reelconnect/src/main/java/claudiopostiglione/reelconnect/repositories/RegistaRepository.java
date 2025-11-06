package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Regista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RegistaRepository extends JpaRepository<Regista, UUID> {
}
