package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.RiconoscimentoSerieTv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RiconoscimentoSerieTvRepository extends JpaRepository<RiconoscimentoSerieTv, UUID> {
}
