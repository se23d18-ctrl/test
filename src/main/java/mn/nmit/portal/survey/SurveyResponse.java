package mn.nmit.portal.survey;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "survey_responses")
public class SurveyResponse {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 32)
  private String studentCode;

  @Column(nullable = false)
  private String course;

  @Column(nullable = false)
  private int rating;

  @Column(nullable = false, length = 1200)
  private String comment;

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  protected SurveyResponse() {
  }

  public SurveyResponse(String studentCode, String course, int rating, String comment) {
    this.studentCode = studentCode;
    this.course = course;
    this.rating = rating;
    this.comment = comment;
  }

  public Long getId() {
    return id;
  }

  public String getStudentCode() {
    return studentCode;
  }

  public String getCourse() {
    return course;
  }

  public int getRating() {
    return rating;
  }

  public String getComment() {
    return comment;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
