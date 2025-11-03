package claudiopostiglione.reelconnect.authServices;

import claudiopostiglione.reelconnect.security.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JWTTools jwtTools;

}
