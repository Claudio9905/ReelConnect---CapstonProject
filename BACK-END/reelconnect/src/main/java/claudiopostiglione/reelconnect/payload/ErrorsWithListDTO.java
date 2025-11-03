package claudiopostiglione.reelconnect.payload;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorsWithListDTO(
        String message,
        List<String> errorsList,
        LocalDateTime timestamp
) {
}
