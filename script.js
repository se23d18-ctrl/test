const state = {
  auth: {
    code: "SE23D18",
    password: "1234"
  },
  course1: [
    {
      code: "CS101",
      name: "Java Programming",
      credit: 3,
      room: "ШМТИС 711",
      type: "лекц",
      seat: "25/30",
      selected: false,
      teacher: "",
      time: "",
      teachers: ["Б. Бат-Эрдэнэ", "Д. Саруул", "Г. Энхжин"],
      times: ["Даваа 09:00", "Мягмар 11:00", "Пүрэв 14:00"]
    },
    {
      code: "DB101",
      name: "Database System",
      credit: 3,
      room: "ШМТИС 405",
      type: "лаборатори",
      seat: "28/30",
      selected: false,
      teacher: "",
      time: "",
      teachers: ["С. Тэмүүлэн", "А. Номин", "Ч. Мөнхбат"],
      times: ["Даваа 13:00", "Лхагва 10:00", "Баасан 15:00"]
    },
    {
      code: "WD101",
      name: "Web Development",
      credit: 2,
      room: "ШМТИС 506",
      type: "лекц",
      seat: "20/30",
      selected: false,
      teacher: "",
      time: "",
      teachers: ["Э. Болор", "Н. Ариун", "Б. Төгөлдөр"],
      times: ["Мягмар 09:00", "Лхагва 14:00", "Пүрэв 16:00"]
    },
    {
      code: "SE201",
      name: "Software Engineering",
      credit: 3,
      room: "ШМТИС 302",
      type: "семинар",
      seat: "18/25",
      selected: false,
      teacher: "",
      time: "",
      teachers: ["Ж. Төгөлдөр", "М. Сувд", "О. Анхбаяр"],
      times: ["Даваа 15:00", "Мягмар 13:00", "Баасан 10:00"]
    },
    {
      code: "AI201",
      name: "Artificial Intelligence",
      credit: 3,
      room: "ШМТИС 808",
      type: "лекц",
      seat: "12/20",
      selected: false,
      teacher: "",
      time: "",
      teachers: ["Л. Мөнх-Оргил", "Ц. Хулан", "П. Наран"],
      times: ["Лхагва 09:00", "Пүрэв 11:00", "Баасан 13:00"]
    }
  ],
  grades: [
    {
      semester: "2025 Намар",
      code: "WD101",
      name: "Web Development",
      credit: 2,
      lab: 18,
      attendance: 10,
      assignment: 24,
      midterm: 18,
      final: 22
    },
    {
      semester: "2025 Намар",
      code: "CS101",
      name: "Java Programming",
      credit: 3,
      lab: 17,
      attendance: 9,
      assignment: 21,
      midterm: 17,
      final: 20
    },
    {
      semester: "2025 Намар",
      code: "DB101",
      name: "Database System",
      credit: 3,
      lab: 19,
      attendance: 10,
      assignment: 23,
      midterm: 16,
      final: 21
    },
    {
      semester: "2025 Хавар",
      code: "MATH102",
      name: "Calculus II",
      credit: 3,
      lab: 18,
      attendance: 9,
      assignment: 22,
      midterm: 17,
      final: 21
    },
    {
      semester: "2025 Хавар",
      code: "ENG102",
      name: "Academic English II",
      credit: 2,
      lab: 19,
      attendance: 10,
      assignment: 23,
      midterm: 18,
      final: 20
    },
    {
      semester: "2024 Намар",
      code: "MATH101",
      name: "Calculus I",
      credit: 3,
      lab: 17,
      attendance: 10,
      assignment: 21,
      midterm: 16,
      final: 22
    },
    {
      semester: "2024 Намар",
      code: "PHY101",
      name: "Physics",
      credit: 3,
      lab: 18,
      attendance: 9,
      assignment: 20,
      midterm: 17,
      final: 19
    }
  ],
  attendance: [],
payment: {
  completed: false,
  method: ""
}
};

const setMessage = (element, message = "", type = "") => {
  element.textContent = message;
  element.className = type ? `message ${type}` : "message";
};

const formatCurrency = (amount) => `${amount.toLocaleString("mn-MN")}₮`;
function updateTodayCard() {

  const icon = document.getElementById("todayIcon");
  const courseText = document.getElementById("todayCourse");
  const roomText = document.getElementById("todayRoom");
  const timeText = document.getElementById("todayTime");

  if (!icon || !courseText || !roomText || !timeText) {
    return;
  }

  const scheduledCourses = getScheduledCourses();

  if (!state.payment.completed || scheduledCourses.length === 0) {
    icon.textContent = "⌘";
    courseText.textContent = "Хуваарь үүсээгүй байна";
    roomText.textContent = "Төлбөр төлсний дараа гарна";
    timeText.textContent = "--:--";
    return;
  }

  const course = scheduledCourses[0];

  icon.textContent = course.code.slice(0, 2);
  courseText.textContent = course.name;
  roomText.textContent = course.room;
  timeText.textContent = course.time;
};

const openPage = (pageId) => {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  if (pageId === "course1Page" || pageId === "course2Page") {
    renderCourseList(pageId);
  }

  if (pageId === "schedulePage") {
    renderSchedule();
  }

  if (pageId === "courseHubPage") {
    renderCourseHub();
  }

  if (pageId === "gradePage") {
    renderGradeList();
  }

  if (pageId === "attendancePage") {
    renderAttendancePage();
  }

  updateCredit();
  updateTodayCard();
};

const getSelectedCourses = () => state.course1.filter((course) => course.selected);

const getScheduledCourses = () => getSelectedCourses().filter((course) => course.teacher && course.time);

const renderSchedule = () => {
  const container = document.getElementById("scheduleList");
  if (!state.payment.completed) {
    container.innerHTML = `
      <article class="empty-state">
        <h3>Хуваарь харахын тулд төлбөрөө төлнө үү</h3>
        <p>QR эсвэл дансаар төлбөрөө баталгаажуулсны дараа хичээлийн хуваарь автоматаар гарна.</p>
        <button type="button" data-page="paymentPage">Төлбөр төлөх</button>
      </article>
    `;
    return;
  }

  const scheduledCourses = getScheduledCourses().filter(course =>
  course.time.startsWith(state.activeDay)
);

  if (scheduledCourses.length === 0) {
    container.innerHTML = `
      <article class="empty-state">
        <h3>Хуваарь үүсээгүй байна</h3>
        <p>Эхлээд Сонголт хэсгээс хичээл, багш, цагийг сонгоно уу.</p>
        <button type="button" data-page="courseHubPage">Хичээл сонголт руу очих</button>
      </article>
    `;
    return;
  }

  container.innerHTML = scheduledCourses
    .map((course, index) => {
      const timeParts = course.time.split(" ");
      const time = timeParts.slice(1).join(" ") || course.time;
      const tone = index % 2 === 0 ? "" : "blue";

      return `
        <article class="schedule-card ${tone}">
          <div class="lesson-icon">${course.code.slice(0, 2)}</div>
          <div class="lesson-content">
            <h3>${course.name} / ${course.type}</h3>
            <p>${course.room}</p>
            <div>
              <span>${course.teacher}</span>
              <strong>${time}</strong>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
};
function setDay(day) {

  state.activeDay = day;

  document.querySelectorAll(".day-tabs button")
    .forEach(btn => {
      btn.classList.remove("active");
    });

  document
    .querySelector(`[data-day="${day}"]`)
    ?.classList.add("active");

  renderSchedule();
}

const getTotalScore = (grade) => {
  return grade.lab + grade.attendance + grade.assignment + grade.midterm + grade.final;
};

const getLetterGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 87) return "A-";
  if (score >= 83) return "B+";
  if (score >= 80) return "B";
  if (score >= 77) return "B-";
  if (score >= 73) return "C+";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const getGradePoint = (score) => {
  if (score >= 90) return 4.0;
  if (score >= 87) return 3.7;
  if (score >= 83) return 3.3;
  if (score >= 80) return 3.0;
  if (score >= 77) return 2.7;
  if (score >= 73) return 2.3;
  if (score >= 70) return 2.0;
  if (score >= 60) return 1.0;
  return 0;
};

const getSemesterStats = (grades) => {
  const courseCount = grades.length;
  const creditCount = grades.reduce((sum, grade) => sum + grade.credit, 0);
  const averageGpa = creditCount
    ? grades.reduce((sum, grade) => {
        return sum + getGradePoint(getTotalScore(grade)) * grade.credit;
      }, 0) / creditCount
    : 0;

  return {
    courseCount,
    creditCount,
    averageGpa: averageGpa.toFixed(2)
  };
};

const renderGradeList = () => {
  const container = document.getElementById("gradeList");
  const summary = document.getElementById("gradeSummary");
  const totalStats = getSemesterStats(state.grades);
  const semesterGroups = state.grades.reduce((groups, grade) => {
    if (!groups[grade.semester]) {
      groups[grade.semester] = [];
    }

    groups[grade.semester].push(grade);
    return groups;
  }, {});

  summary.innerHTML = `
    <div>
      <span>Нийт хичээл</span>
      <strong>${totalStats.courseCount}</strong>
    </div>
    <div>
      <span>Нийт кредит</span>
      <strong>${totalStats.creditCount}</strong>
    </div>
    <div>
      <span>Голч</span>
      <strong>${totalStats.averageGpa}</strong>
    </div>
  `;

  container.innerHTML = Object.entries(semesterGroups)
    .map(([semester, grades]) => {
      const semesterStats = getSemesterStats(grades);
      return `
        <section class="semester-block">
          <div class="semester-head">
            <div>
              <h3>${semester}</h3>
              <span>${semesterStats.courseCount} хичээл • ${semesterStats.creditCount} кредит</span>
            </div>
            <strong>${semesterStats.averageGpa}</strong>
          </div>
          ${grades
            .map((grade) => {
              const total = getTotalScore(grade);
              const letter = getLetterGrade(total);

              return `
                <article class="grade-card">
                  <div class="grade-head">
                    <div>
                      <h3>${grade.code} - ${grade.name}</h3>
                      <span>${grade.credit} кредит • Нийт 100 онооноос</span>
                    </div>
                    <strong>${letter}</strong>
                  </div>
                  <div class="grade-total">
                    <span>Нийт оноо</span>
                    <b>${total}</b>
                  </div>
                  <div class="grade-breakdown">
                    <div><span>Лаб</span><strong>${grade.lab}/20</strong></div>
                    <div><span>Ирц</span><strong>${grade.attendance}/10</strong></div>
                    <div><span>Бие даалт</span><strong>${grade.assignment}/25</strong></div>
                    <div><span>Явцын шалгалт</span><strong>${grade.midterm}/20</strong></div>
                    <div><span>Улирлын шалгалт</span><strong>${grade.final}/25</strong></div>
                  </div>
                </article>
              `;
            })
            .join("")}
        </section>
      `;
    })
    .join("");
};

const renderCourseList = (pageId) => {
  if (pageId === "course2Page") {
    renderCourseSchedule("course2List", "course1Page");
    return;
  }

  renderCourseSelection("course1List");
};

const renderCourseSelection = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  container.innerHTML = state.course1
    .map((course, index) => `
      <article class="course ${course.selected ? "selected" : ""}">
        <h3>${course.code} - ${course.name}</h3>
        <p>Кредит: ${course.credit}</p>
        <p>Суудал: ${course.seat}</p>
        <p>Сонголт II: <strong>${course.teacher && course.time ? "Баталгаажсан" : "Багш/цаг сонгоогүй"}</strong></p>
        <button type="button" data-action="toggleCourse" data-index="${index}">
          ${course.selected ? "Цуцлах" : "Сонгох"}
        </button>
      </article>
    `)
    .join("");
};

const renderCourseSchedule = (containerId, emptyTarget = "course1Page") => {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const selectedCourses = getSelectedCourses();

  if (selectedCourses.length === 0) {
    container.innerHTML = `
      <article class="empty-state">
        <h3>Сонгосон хичээл алга</h3>
        <p>Эхлээд Хичээл сонголт I хэсгээс боломжтой хичээлээ сонгоно уу.</p>
        <button type="button" data-page="${emptyTarget}">Хичээл сонголт I рүү очих</button>
      </article>
    `;
    return;
  }

  container.innerHTML = selectedCourses
    .map((course) => {
      const index = state.course1.indexOf(course);
      const targetKey = containerId.replace(/[^a-zA-Z0-9]/g, "");
      const teacherOptions = course.teachers
        .map((teacher) => `<option value="${teacher}" ${course.teacher === teacher ? "selected" : ""}>${teacher}</option>`)
        .join("");
      const timeOptions = course.times
        .map((time) => `<option value="${time}" ${course.time === time ? "selected" : ""}>${time}</option>`)
        .join("");

      return `
        <article class="course schedule-choice ${course.teacher && course.time ? "selected" : ""}">
          <h3>${course.code} - ${course.name}</h3>
          <p>Кредит: ${course.credit}</p>
          <div class="field">
            <label for="teacher-${targetKey}-${index}">Багш</label>
            <select id="teacher-${targetKey}-${index}" data-action="setCourseOption" data-index="${index}" data-field="teacher">
              <option value="">Багш сонгох</option>
              ${teacherOptions}
            </select>
          </div>
          <div class="field">
            <label for="time-${targetKey}-${index}">Цаг</label>
            <select id="time-${targetKey}-${index}" data-action="setCourseOption" data-index="${index}" data-field="time">
              <option value="">Цаг сонгох</option>
              ${timeOptions}
            </select>
          </div>
          <p>Төлөв: <strong>${course.teacher && course.time ? "Бэлэн" : "Дутуу"}</strong></p>
        </article>
      `;
    })
    .join("");
};

const renderCourseHub = () => {
  renderCourseSelection("hubCourse1List");
  renderCourseSchedule("hubCourse2List", "courseHubPage");
  updateCredit();
};

const toggleCourse = (index) => {
  const course = state.course1[index];
  course.selected = !course.selected;
  state.payment.completed = false;
state.payment.method = "";

  if (!course.selected) {
    course.teacher = "";
    course.time = "";
  }

  renderCourseSelection("course1List");
  renderCourseHub();
  updateCredit();
};

const setCourseOption = (index, field, value) => {
  state.course1[index][field] = value;
  renderCourseSchedule("course2List");
  renderCourseHub();
};

const getAttendanceCourses = () => {
  const selectedCourses = getSelectedCourses();
  return selectedCourses.length > 0 ? selectedCourses : state.course1;
};

const renderAttendancePage = () => {
  setMessage(document.getElementById("attendanceMsg"), "", "");
  renderAttendanceList();
};

const renderAttendanceList = () => {
  const container = document.getElementById("attendanceList");

  if (state.attendance.length === 0) {
    container.innerHTML = `
      <article class="empty-state">
        <h3>Ирц бүртгээгүй байна</h3>
        <p>QR код уншуулж ирцээ өгнө үү.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = state.attendance
    .map((record) => `
      <article class="attendance-record">
        <div>
          <strong>${record.courseCode}</strong>
          <span>${record.courseName}</span>
        </div>
        <b>${record.status}</b>
        <small>${record.time}</small>
      </article>
    `)
    .join("");
};

const handleAttendanceSubmit = () => {
  const message = document.getElementById("attendanceMsg");
  const course = getAttendanceCourses()[0];

  if (!course) {
    setMessage(message, "Ирц өгөх хичээл олдсонгүй", "error");
    return;
  }

  const now = new Date();
  const time = now.toLocaleString("mn-MN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  state.attendance.unshift({
    courseCode: course.code,
    courseName: course.name,
    status: "Ирсэн",
    time
  });

  setMessage(message, `QR уншигдлаа. ${course.name} хичээлийн ирц бүртгэгдлээ`, "success");
  renderAttendanceList();
};
const updateCredit = () => {
  const totalCredit = getSelectedCourses().reduce((sum, course) => sum + course.credit, 0);
  const creditPrice = 220000;
  const totalPayment = totalCredit * creditPrice;

  document.getElementById("creditCount").textContent = totalCredit;
  document.getElementById("dashboardGpa").textContent = getSemesterStats(state.grades).averageGpa;
  document.getElementById("hubCreditCount").textContent = totalCredit;
  document.getElementById("hubPaymentCredit").textContent = totalCredit;
  document.getElementById("hubPaymentTotal").textContent = formatCurrency(totalPayment);

  const paymentCredit = document.getElementById("paymentCredit");
  const paymentTotal = document.getElementById("paymentTotal");
  const paymentStatus = document.getElementById("paymentStatus");

  if (paymentCredit) paymentCredit.textContent = totalCredit;
  if (paymentTotal) paymentTotal.textContent = formatCurrency(totalPayment);

  if (paymentStatus) {
    if (state.payment.completed) {
      paymentStatus.textContent = state.payment.method === "qr" ? "Төлсөн / QR" : "Төлсөн / Данс";
      paymentStatus.className = "payment-paid";
    } else {
      paymentStatus.textContent = "Төлөөгүй";
      paymentStatus.className = "payment-unpaid";
    }
  }
};

const handleLogin = () => {
  const code = document.getElementById("studentCode").value.trim().toUpperCase();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMsg");

  if (code === state.auth.code && password === state.auth.password) {
    setMessage(message, "", "");
    openPage("homePage");
    return;
  }

  setMessage(message, "Код эсвэл нууц үг буруу байна", "error");
};

const handleForgotPassword = () => {
  const loginCode = document.getElementById("studentCode").value.trim().toUpperCase();

  document.getElementById("recoveryCode").value = loginCode;
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
  setMessage(document.getElementById("loginMsg"), "", "");
  setMessage(document.getElementById("recoveryMsg"), "", "");
  openPage("recoveryPage");
  document.getElementById("recoveryCode").focus();
};

const handleRecoverySubmit = () => {
  const code = document.getElementById("recoveryCode").value.trim().toUpperCase();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const message = document.getElementById("recoveryMsg");

  if (!code) {
    setMessage(message, "Оюутны кодоо оруулна уу", "error");
    document.getElementById("recoveryCode").focus();
    return;
  }

  if (code !== state.auth.code) {
    setMessage(message, "Ийм оюутны код бүртгэлгүй байна", "error");
    return;
  }

  if (!newPassword || !confirmPassword) {
    setMessage(message, "Шинэ нууц үгээ хоёр удаа оруулна уу", "error");
    document.getElementById("newPassword").focus();
    return;
  }

  if (newPassword.length < 4) {
    setMessage(message, "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой", "error");
    document.getElementById("newPassword").focus();
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage(message, "Давтан оруулсан нууц үг таарахгүй байна", "error");
    document.getElementById("confirmPassword").focus();
    return;
  }

  state.auth.password = newPassword;
  document.getElementById("password").value = "";
  setMessage(message, "Шинэ нууц үг амжилттай хадгалагдлаа. Одоо шинэ нууц үгээрээ нэвтэрнэ үү", "success");
};

const handleLogout = () => {
  document.getElementById("studentCode").value = "";
  document.getElementById("password").value = "";
  openPage("loginPage");
};

const handlePayment = () => {
  const selectedCourses = getSelectedCourses();
  const message = document.getElementById("payMsg");

  if (selectedCourses.length === 0) {
    setMessage(message, "Эхлээд хичээл сонгоно уу", "error");
    return;
  }

  document.getElementById("paymentOptions").classList.toggle("hidden");
  document.getElementById("qrPanel").classList.add("hidden");
  document.getElementById("bankPanel").classList.add("hidden");
  setMessage(message, "Төлбөрийн хэлбэрээ сонгоно уу", "");
};

const choosePayment = (method) => {
  document.getElementById("qrPanel").classList.add("hidden");
  document.getElementById("bankPanel").classList.add("hidden");

  if (method === "qr") {
    document.getElementById("qrPanel").classList.remove("hidden");
  }

  if (method === "bank") {
    document.getElementById("bankPanel").classList.remove("hidden");
  }
};

const confirmPayment = (method) => {
  state.payment.completed = true;
  state.payment.method = method;

  document.getElementById("paymentOptions").classList.add("hidden");
  document.getElementById("qrPanel").classList.add("hidden");
  document.getElementById("bankPanel").classList.add("hidden");

  updateCredit();
  updateTodayCard();

  setMessage(
    document.getElementById("payMsg"),
    "Төлбөр амжилттай баталгаажлаа. Одоо хуваарь автоматаар үүснэ.",
    "success"
  );

  setTimeout(() => {
    openPage("schedulePage");
  }, 700);
};

const handleProfileSave = () => {
  setMessage(document.getElementById("profileMsg"), "Мэдээлэл хадгалагдлаа", "success");
};

const handlePasswordChange = () => {
  const currentPassword = document.getElementById("currentPassword").value.trim();
  const newPassword = document.getElementById("profileNewPassword").value.trim();
  const confirmPassword = document.getElementById("profileConfirmPassword").value.trim();
  const message = document.getElementById("passwordMsg");

  if (currentPassword !== state.auth.password) {
    setMessage(message, "Одоогийн нууц үг буруу байна", "error");
    document.getElementById("currentPassword").focus();
    return;
  }

  if (!newPassword || !confirmPassword) {
    setMessage(message, "Шинэ нууц үгээ хоёр удаа оруулна уу", "error");
    document.getElementById("profileNewPassword").focus();
    return;
  }

  if (newPassword.length < 4) {
    setMessage(message, "Нууц үг хамгийн багадаа 4 тэмдэгттэй байх ёстой", "error");
    document.getElementById("profileNewPassword").focus();
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage(message, "Давтан оруулсан нууц үг таарахгүй байна", "error");
    document.getElementById("profileConfirmPassword").focus();
    return;
  }

  state.auth.password = newPassword;
  document.getElementById("currentPassword").value = "";
  document.getElementById("profileNewPassword").value = "";
  document.getElementById("profileConfirmPassword").value = "";
  setMessage(message, "Нууц үг амжилттай солигдлоо", "success");
};

const handleGlobalClick = (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    openPage(pageButton.dataset.page);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const action = actionButton.dataset.action;

  if (action === "logout") {
    handleLogout();
    return;
  }

  if (action === "toggleCourse") {
    const index = Number(actionButton.dataset.index);
    toggleCourse(index);
    return;
  }

  if (action === "choosePayment") {
    choosePayment(actionButton.dataset.method);
    return;
  }

  if (action === "confirmPayment") {
    confirmPayment(actionButton.dataset.method);
    return;
  }
};
const handleGlobalChange = (event) => {
  const optionInput = event.target.closest("[data-action='setCourseOption']");
  if (!optionInput) {
    return;
  }

  const index = Number(optionInput.dataset.index);
  const field = optionInput.dataset.field;
  setCourseOption(index, field, optionInput.value);
};

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  document.getElementById("themeToggle").textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("studentPortalTheme", theme);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem("studentPortalTheme") || "light";
  applyTheme(savedTheme);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
};

const init = () => {
  initTheme();
  document.getElementById("loginButton").addEventListener("click", handleLogin);
  document.getElementById("forgotPasswordLink").addEventListener("click", (event) => {
    event.preventDefault();
    handleForgotPassword();
  });
  document.getElementById("sendRecoveryButton").addEventListener("click", handleRecoverySubmit);
  document.getElementById("submitAttendanceButton").addEventListener("click", handleAttendanceSubmit);
  document.getElementById("payButton").addEventListener("click", handlePayment);
  document.getElementById("saveProfileButton").addEventListener("click", handleProfileSave);
  document.getElementById("changePasswordButton").addEventListener("click", handlePasswordChange);
  document.addEventListener("click", handleGlobalClick);
  document.addEventListener("change", handleGlobalChange);
  openPage("loginPage");
};

init();
function updateTodayCard() {

  const icon = document.getElementById("todayIcon");
  const courseText = document.getElementById("todayCourse");
  const roomText = document.getElementById("todayRoom");
  const timeText = document.getElementById("todayTime");

  if (!icon || !courseText || !roomText || !timeText) {
    return;
  }

  const scheduledCourses = getScheduledCourses();

  if (!state.payment.completed || scheduledCourses.length === 0) {
    icon.textContent = "⌘";
    courseText.textContent = "Хуваарь үүсээгүй байна";
    roomText.textContent = "Төлбөр төлсний дараа гарна";
    timeText.textContent = "--:--";
    return;
  }

  const course = scheduledCourses[0];

  icon.textContent = course.code.slice(0, 2);
  courseText.textContent = course.name;
  roomText.textContent = course.room;
  timeText.textContent = course.time;
};
