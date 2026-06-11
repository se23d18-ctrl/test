package mn.nmit.portal;

import mn.nmit.portal.student.Student;
import mn.nmit.portal.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StudentPortalApplication {

  public static void main(String[] args) {
    SpringApplication.run(StudentPortalApplication.class, args);
  }

  @Bean
  CommandLineRunner seedDefaultStudent(StudentRepository students) {
    return args -> students.findByCode("SE23D18").orElseGet(() ->
        students.save(new Student("SE23D18", "1234", "С.ЭНХТУЛГА", "99999999", "SE23D18@nmit.edu.mn"))
    );
  }
}
