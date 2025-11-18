package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.repositories.CommentoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CommentoService {

    @Autowired
    private CommentoRepository commentoRepository;
}
