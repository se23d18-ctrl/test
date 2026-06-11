package mn.nmit.portal.leave;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {
  private final LeaveRequestRepository leaveRequests;

  public LeaveRequestController(LeaveRequestRepository leaveRequests) {
    this.leaveRequests = leaveRequests;
  }

  @PostMapping
  LeaveRequest submit(@Valid @RequestBody LeaveSubmitRequest request) {
    return leaveRequests.save(new LeaveRequest(
        request.studentCode().trim().toUpperCase(),
        request.leaveDate(),
        request.reason().trim()
    ));
  }

  record LeaveSubmitRequest(
      @NotBlank(message = "Оюутны код дутуу байна") String studentCode,
      @NotNull(message = "Чөлөө авах огноогоо сонгоно уу") LocalDate leaveDate,
      @NotBlank(message = "Шалтгаанаа бичнэ үү") String reason
  ) {
  }
}
