package claudiopostiglione.reelconnect.payload;


import java.time.LocalDateTime;

public record ErrorDTO(
        String message,
        LocalDateTime timestamp
) {
}
