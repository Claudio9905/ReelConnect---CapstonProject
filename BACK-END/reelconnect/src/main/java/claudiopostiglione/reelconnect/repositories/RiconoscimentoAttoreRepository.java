package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.RiconoscimentoAttore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RiconoscimentoAttoreRepository extends JpaRepository<RiconoscimentoAttore, UUID> {
}
