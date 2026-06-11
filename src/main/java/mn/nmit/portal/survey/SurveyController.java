package mn.nmit.portal.survey;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {
  private final SurveyResponseRepository surveys;

  public SurveyController(SurveyResponseRepository surveys) {
    this.surveys = surveys;
  }

  @PostMapping
  SurveyResponse submit(@Valid @RequestBody SurveyRequest request) {
    return surveys.save(new SurveyResponse(
        request.studentCode().trim().toUpperCase(),
        request.course().trim(),
        request.rating(),
        request.comment().trim()
    ));
  }

  record SurveyRequest(
      @NotBlank(message = "Оюутны код дутуу байна") String studentCode,
      @NotBlank(message = "Хичээлээ сонгоно уу") String course,
      @NotNull(message = "Үнэлгээгээ сонгоно уу") @Min(1) @Max(5) Integer rating,
      @NotBlank(message = "Саналаа бичнэ үү") String comment
  ) {
  }
}
