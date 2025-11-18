package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostService {

    @Autowired
    private PostRepository postRepository;
}
