package mn.nmit.portal.student;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import mn.nmit.portal.common.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {
  private final StudentRepository students;

  public StudentController(StudentRepository students) {
    this.students = students;
  }

  @PutMapping("/{code}/profile")
  StudentDto updateProfile(@PathVariable String code, @Valid @RequestBody ProfileRequest request) {
    Student student = getStudent(code);
    student.setName(request.name().trim());
    student.setPhone(request.phone().trim());
    return StudentDto.from(students.save(student));
  }

  @PutMapping("/{code}/password")
  StudentDto changePassword(@PathVariable String code, @Valid @RequestBody PasswordRequest request) {
    Student student = getStudent(code);

    if (!student.getPassword().equals(request.currentPassword().trim())) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "Одоогийн нууц үг буруу байна");
    }

    if (!request.newPassword().equals(request.confirmPassword())) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "Давтан оруулсан нууц үг таарахгүй байна");
    }

    student.setPassword(request.newPassword());
    return StudentDto.from(students.save(student));
  }

  private Student getStudent(String code) {
    return students.findByCode(code.trim().toUpperCase())
        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Оюутан олдсонгүй"));
  }

  record ProfileRequest(
      @NotBlank(message = "Нэрээ оруулна уу") String name,
      @NotBlank(message = "Утасны дугаараа оруулна уу") String phone
  ) {
  }

  record PasswordRequest(
      @NotBlank(message = "Одоогийн нууц үгээ оруулна уу") String currentPassword,
      @Size(min = 4, message = "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой") String newPassword,
      @Size(min = 4, message = "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой") String confirmPassword
  ) {
  }
}
