package mn.nmit.portal.common;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiErrorHandler {

  @ExceptionHandler(ApiException.class)
  ResponseEntity<Map<String, String>> handleApiException(ApiException error) {
    return ResponseEntity.status(error.getStatus()).body(Map.of("message", error.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException error) {
    String message = error.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(field -> field.getDefaultMessage())
        .orElse("Мэдээллээ бүрэн оруулна уу");

    return ResponseEntity.badRequest().body(Map.of("message", message));
  }
}
