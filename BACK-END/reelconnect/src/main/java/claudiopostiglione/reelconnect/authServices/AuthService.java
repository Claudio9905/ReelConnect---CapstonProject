package claudiopostiglione.reelconnect.authServices;

import claudiopostiglione.reelconnect.payload.LoginDTO;
import claudiopostiglione.reelconnect.security.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JWTTools jwtTools;

    public String checkAndCreateToken(LoginDTO bodyLogin){
        //Controllo delle credenziali di accesso
        
    }


}
