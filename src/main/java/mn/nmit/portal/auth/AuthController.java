package mn.nmit.portal.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import mn.nmit.portal.common.ApiException;
import mn.nmit.portal.student.Student;
import mn.nmit.portal.student.StudentDto;
import mn.nmit.portal.student.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final StudentRepository students;

  public AuthController(StudentRepository students) {
    this.students = students;
  }

  @PostMapping("/login")
  StudentDto login(@Valid @RequestBody LoginRequest request) {
    Student student = students.findByCode(request.code().trim().toUpperCase())
        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Код эсвэл нууц үг буруу байна"));

    if (!student.getPassword().equals(request.password().trim())) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, "Код эсвэл нууц үг буруу байна");
    }

    return StudentDto.from(student);
  }

  @PostMapping("/recover")
  StudentDto recover(@Valid @RequestBody RecoverPasswordRequest request) {
    Student student = students.findByCode(request.code().trim().toUpperCase())
        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Ийм оюутны код бүртгэлгүй байна"));

    if (!request.newPassword().equals(request.confirmPassword())) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "Давтан оруулсан нууц үг таарахгүй байна");
    }

    student.setPassword(request.newPassword());
    return StudentDto.from(students.save(student));
  }

  record LoginRequest(
      @NotBlank(message = "Оюутны кодоо оруулна уу") String code,
      @NotBlank(message = "Нууц үгээ оруулна уу") String password
  ) {
  }

  record RecoverPasswordRequest(
      @NotBlank(message = "Оюутны кодоо оруулна уу") String code,
      @Size(min = 4, message = "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой") String newPassword,
      @Size(min = 4, message = "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой") String confirmPassword
  ) {
  }
}
