package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FilmRepository extends JpaRepository<Film, UUID> {

    Optional<Film> findByTitolo( String titolo);
}
