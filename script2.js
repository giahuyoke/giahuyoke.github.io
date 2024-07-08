let questions = [];

function addQuestion() {
  const question = sanitizeInput(document.getElementById("question").value);
  const optionA = sanitizeInput(document.getElementById("optionA").value);
  const optionB = sanitizeInput(document.getElementById("optionB").value);
  const optionC = sanitizeInput(document.getElementById("optionC").value);
  const optionD = sanitizeInput(document.getElementById("optionD").value);

  // Lấy giá trị của radio button được chọn
  let correctAnswerIndex = -1;
  for (let i = 0; i <= 3; i++) {
    if (document.getElementById(`correctAnswer${i}`).checked) {
      correctAnswerIndex = i;
      break;
    }
  }

  // Kiểm tra tính hợp lệ của đáp án đúng
  if (correctAnswerIndex === -1) {
    alert("Vui lòng chọn đáp án đúng");
    return;
  }

  // Tạo đối tượng câu hỏi mới
  const newQuestion = {
    question: question,
    options: [optionA, optionB, optionC, optionD],
    correctAnswerIndex: correctAnswerIndex,
  };

  // Thêm câu hỏi vào danh sách và cập nhật giao diện
  questions.push(newQuestion);
  updateQuestionList();

  // Xóa nội dung input và bỏ chọn radio button
  document.getElementById("question").value = "";
  document.getElementById("optionA").value = "";
  document.getElementById("optionB").value = "";
  document.getElementById("optionC").value = "";
  document.getElementById("optionD").value = "";
  document.querySelector('input[name="correctAnswer"]:checked').checked = false;
}

function updateQuestionList() {
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";
  questions.forEach((q, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${q.question}`;
    questionList.appendChild(li);
  });
}

function downloadQuestions() {
  if (questions.length === 0) {
    alert("Không có câu hỏi để tải xuống");
    return;
  }

  // Tạo nội dung JSON từ danh sách câu hỏi
  const jsonContent = JSON.stringify(questions, null, 2);

  // Tạo đối tượng blob từ nội dung JSON
  const blob = new Blob([jsonContent], { type: "application/json" });

  // Tạo đường dẫn URL để tải xuống
  const url = URL.createObjectURL(blob);

  // Tạo và thiết lập thuộc tính cho thẻ a để tải xuống
  const a = document.createElement("a");
  a.href = url;
  a.download = "questions.json";
  a.textContent = "Tải xuống";

  // Thêm thẻ a vào body và kích hoạt sự kiện click để tự động tải xuống
  document.body.appendChild(a);
  a.click();

  // Xóa thẻ a sau khi đã tải xuống xong
  document.body.removeChild(a);
}

function sanitizeInput(input) {
  return JSON.stringify(input).replace(/^"|"$/g, "");
}
