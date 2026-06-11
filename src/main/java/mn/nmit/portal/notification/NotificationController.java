package mn.nmit.portal.notification;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @GetMapping
  List<NotificationDto> list() {
    return List.of(
        new NotificationDto("Хичээл сонголт", "Хичээл сонголтын мэдээллээ шалгана уу.", "Өнөөдөр"),
        new NotificationDto("Төлбөр", "Төлбөр төлсний дараа хуваарь идэвхжинэ.", "Өчигдөр")
    );
  }

  record NotificationDto(String title, String body, String dateText) {
  }
}
