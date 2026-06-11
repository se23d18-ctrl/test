package mn.nmit.portal.leave;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 32)
  private String studentCode;

  @Column(nullable = false)
  private LocalDate leaveDate;

  @Column(nullable = false, length = 1200)
  private String reason;

  @Column(nullable = false, length = 32)
  private String status = "Илгээсэн";

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  protected LeaveRequest() {
  }

  public LeaveRequest(String studentCode, LocalDate leaveDate, String reason) {
    this.studentCode = studentCode;
    this.leaveDate = leaveDate;
    this.reason = reason;
  }

  public Long getId() {
    return id;
  }

  public String getStudentCode() {
    return studentCode;
  }

  public LocalDate getLeaveDate() {
    return leaveDate;
  }

  public String getReason() {
    return reason;
  }

  public String getStatus() {
    return status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
