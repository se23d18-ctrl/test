# NMIT Student Portal

Static frontend + Java Spring Boot backend + MySQL.

## Backend ажиллуулах

1. MySQL server асаана.
2. `src/main/resources/application.properties` доторх MySQL username/password-оо тааруулна.
3. Terminal дээр project root-оос ажиллуулна:

```bash
mvn spring-boot:run
```

Spring Boot `http://localhost:8080` дээр API асаана. Database `student_portal` байхгүй бол автоматаар үүснэ.

## Frontend ашиглах

`index.html`-ээ browser дээр нээнэ. Login:

- Код: `SE23D18`
- Нууц үг: `1234`

Frontend API base: `http://localhost:8080/api`.

## API endpoints

- `POST /api/auth/login`
- `POST /api/auth/recover`
- `PUT /api/students/{code}/profile`
- `PUT /api/students/{code}/password`
- `POST /api/surveys`
- `POST /api/leave-requests`
- `GET /api/notifications`
