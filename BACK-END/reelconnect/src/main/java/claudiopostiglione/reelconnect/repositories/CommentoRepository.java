package claudiopostiglione.reelconnect.repositories;

import claudiopostiglione.reelconnect.entities.utente.Commento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentoRepository extends JpaRepository<Commento, UUID> {
Page<Commento> findByPostId(UUID postId, Pageable pageable);
}
