package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.CatalogoTvFilm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CatalogoTvFilmRepository extends JpaRepository<CatalogoTvFilm, UUID> {
}
