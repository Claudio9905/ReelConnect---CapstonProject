package claudiopostiglione.reelconnect.runner;

import claudiopostiglione.reelconnect.entities.utente.RuoloUtente;
import claudiopostiglione.reelconnect.entities.utente.TipoSesso;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class RunnerAdminInitializer implements CommandLineRunner {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private PasswordEncoder bCrypt;

    @Override
    public void run(String... args) throws Exception {
//        Creazione iniziale di un ADMIN
        if (this.utenteRepository.findByEmail("admin@admin.com").isEmpty()) {
            Utente admin = new Utente("Claudio", "Postiglione", "Kako", 26, LocalDate.of(1999, 11, 10), TipoSesso.MALE, "admin@admin.com", bCrypt.encode("Kakokira_9905"));
            admin.setAvatarUrl("https://ui-avatars.com/api/?name=" + admin.getNome() + "+" + admin.getCognome());
            admin.setRole(RuoloUtente.ADMIN);
            this.utenteRepository.save(admin);
            System.out.println("ADMIN: " + "\n"
                    + admin);

        }
    }
}
