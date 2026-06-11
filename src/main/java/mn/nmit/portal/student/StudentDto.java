package mn.nmit.portal.student;

public record StudentDto(
    Long id,
    String code,
    String name,
    String phone,
    String email
) {
  public static StudentDto from(Student student) {
    return new StudentDto(
        student.getId(),
        student.getCode(),
        student.getName(),
        student.getPhone(),
        student.getEmail()
    );
  }
}
