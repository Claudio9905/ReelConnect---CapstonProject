package claudiopostiglione.reelconnect.payload;

import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.UUID;

public record PostDTO(
        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,
        UUID utenteId,
        MultipartFile imageFile
) {
}
