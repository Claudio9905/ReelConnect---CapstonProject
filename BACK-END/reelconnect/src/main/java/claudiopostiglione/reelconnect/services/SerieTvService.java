package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.repositories.SerieTvRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SerieTvService {
    @Autowired
    private SerieTvRepository serieTvRepository;
}
