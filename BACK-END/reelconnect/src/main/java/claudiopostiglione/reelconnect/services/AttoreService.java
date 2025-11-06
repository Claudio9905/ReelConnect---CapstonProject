package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.repositories.AttoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AttoreService {
    @Autowired
    private AttoreRepository attoreRepository;
}
