document.addEventListener('DOMContentLoaded', function () {
            displayQuestions(questions);
});

function parseCSV(contents) {
    const lines = contents.split('\n').filter(line => line.trim() !== '');
    const header = lines.shift();
    const questions = lines.map(line => {
        const parts = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
        const [question, optionA, optionB, optionC, optionD, correctAnswerIndex] = parts.map(part => part.replace(/^"|"$/g, ''));
        const options = [optionA, optionB, optionC, optionD];
        return { question, options, correctAnswerIndex };
    });
    return questions;
}

function displayQuestions(questions) {
    const container = document.getElementById('questions');
    container.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);
        q.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = optionIndex;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
        container.appendChild(questionDiv);
    });
}

function submitQuiz() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    let score = 0;
    questions.forEach((q, index) => {
        const questionDiv = document.querySelectorAll('.question')[index];
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const correctOptionIndex = q.correctAnswerIndex;
        
        // Highlight correct answer
        questionDiv.querySelectorAll('label').forEach((label, optionIndex) => {
            if (optionIndex == correctOptionIndex) {
                label.style.color = 'red'; // Highlight correct answer
            }
        });

        if (selectedOption) {
            const answerIndex = selectedOption.value;
            if (answerIndex == correctOptionIndex) {
                score++;
            } else {
                // Mark incorrect answer
                selectedOption.parentElement.style.color = 'blue';
            }
        } else {
            // If no option selected, mark question as unanswered
            questionDiv.style.color = 'blue';
        }
    });
    const resultText = `Bạn đã trả lời đúng ${score} trên ${questions.length} câu.`;
    resultsDiv.textContent = resultText;
}



let questions = [
    {
        "question": "Hành vi bị nghiêm cấm khi sử dụng máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về ATVSLĐ:",
        "options": ["Chưa được kiểm định", "Không có nguồn gốc, xuất xứ rõ ràng", "Hết hạn kiểm định", "Tất cả các hành vi trên"],
        "correctAnswerIndex": 3
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm:",
        "options": [
            "Không thực hiện các yêu cầu, biện pháp bảo đảm an toàn, vệ sinh lao động gây tổn hại hoặc có nguy cơ gây tổn hại đến người, tài sản, môi trường",
            "Buộc người lao động phải làm việc hoặc không được rời khỏi nơi làm việc khi có nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng sức khỏe, tính mạng của họ hoặc buộc người lao động tiếp tục làm việc khi các nguy cơ đó chưa được khắc phục.",
            "Trả tiền thay cho việc bồi dưỡng bằng hiện vật.",
            "Tất cả các hành vi nêu trên."
        ],
        "correctAnswerIndex": 3
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm:",
        "options": [
            "Sử dụng máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về an toàn, vệ sinh lao động không được kiểm định hoặc kết quả kiểm định không đạt yêu cầu hoặc không có nguồn gốc, xuất xứ rõ ràng, hết hạn sử dụng, không bảo đảm chất lượng, gây ô nhiễm môi trường.",
            "Trốn đóng, chậm đóng tiền bảo hiểm tai nạn lao động, bệnh nghề nghiệp; chiếm dụng tiền đóng, hưởng bảo hiểm tai nạn lao động, bệnh nghề nghiệp; gian lận, giả mạo hồ sơ trong việc thực hiện bảo hiểm tai nạn lao động, bệnh nghề nghiệp",
            "Không chi trả chế độ bảo hiểm tai nạn lao động, bệnh nghề nghiệp cho người lao động; quản lý, sử dụng Quỹ bảo hiểm tai nạn lao động, bệnh nghề nghiệp không đúng quy định của pháp luật; truy cập, khai thác trái pháp luật cơ sở dữ liệu về bảo hiểm tai nạn lao động, bệnh nghề nghiệp.",
            "Tất cả các hành vi nêu trên."
        ],
        "correctAnswerIndex": 3
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm:",
        "options": [
            "Gian lận trong các hoạt động kiểm định, huấn luyện an toàn, vệ sinh lao động, quan trắc môi trường lao động, giám định y khoa để xác định mức suy giảm khả năng lao động khi bị tai nạn lao động, bệnh nghề nghiệp",
            "Cản trở, gây khó khăn hoặc làm thiệt hại đến quyền, lợi ích hợp pháp, chính đáng về an toàn, vệ sinh lao động của người lao động, người sử dụng lao động.",
            "Phân biệt đối xử về giới trong bảo đảm an toàn, vệ sinh lao động; phân biệt đối xử vì lý do người lao động từ chối làm công việc hoặc rời bỏ nơi làm việc khi thấy rõ có nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng tính mạng hoặc sức khỏe của mình.",
            "Tất cả các hành vi nêu trên."
        ],
        "correctAnswerIndex": 3
    },
    {
        "question": "Theo Luật AT-VSLĐ số 84/2015/QH13 ngày 25/06/2015, nội dung nào dưới đây thuộc về “Trách nhiệm của Người lao động trong việc bảo đảm an toàn, vệ sinh lao động tại nơi làm việc”?",
        "options": [
            "Chấp hành quy định, nội quy, quy trình, yêu cầu về AT-VSLĐ của NSDLĐ hoặc cơ quan nhà nước có thẩm quyền ban hành liên quan đến công việc, nhiệm vụ được giao",
            "Ngăn chặn nguy cơ trực tiếp gây mất AT-VSLĐ, hành vi vi phạm quy định AT-VSLĐ tại nơi làm việc",
            "Chủ động tham gia ứng cứu, khắc phục sự cố, tai nạn lao động theo phương án xử lý sự cố, ứng cứu khẩn cấp hoặc khi có lệnh của NSDLĐ hoặc cơ quan nhà nước có thẩm quyền",
            "Cả a, b và c đều đúng."
        ],
        "correctAnswerIndex": 3
    },
    {
        "question": "Trong các hoạt động sau đây, hoạt động nào là quyền của người sử dụng lao động:",
        "options": [
            "Yêu cầu người lao động làm thêm giờ cho kịp tiến độ sản xuất mà không cần sự đồng ý của người lao động.",
            "Huy động người lao động tham gia ứng cứu khẩn cấp, khắc phục sự cố, tai nạn lao động.",
            "Cấp phát tiền cho người lao động để người lao động tự trang bị phương tiện bảo vệ cá nhân.",
            "Sa thải nữ lao động vì vi phạm cam kết trong hợp đồng lao động là “ sau khi làm việc 2 năm mới được kết hôn”."
        ],
        "correctAnswerIndex": 1
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Phân biệt đối xử vì lý do người lao động từ chối làm công việc trong điều kiện pháp luật cho phép.",
            "Không phát tiền thay cho việc trang cấp phương tiện bảo vệ cá nhân.",
            "Ngăn chặn nguy cơ trực tiếp gây mất AT-VSLĐ",
            "Huy động người lao động tham gia ứng cứu khẩn cấp, khắc phục sự cố, tai nạn lao động trong điều kiện không có nguy cơ đe dọa đến tính mạng, sức khỏe NLĐ."
        ],
        "correctAnswerIndex": 1
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Từ chối làm công việc hoặc rời bỏ nơi làm việc khi thấy rõ có nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng tính mạng hoặc sức khỏe của mình.",
            "Cản trở, gây khó khăn hoặc làm thiệt hại đến quyền, lợi ích hợp pháp, chính đáng về an toàn, vệ sinh lao động của người lao động, người sử dụng lao động.",
            "Yêu cầu người sử dụng lao động bảo đảm điều kiện làm việc an toàn, vệ sinh, cải thiện điều kiện lao động.",
            "Khiếu nại, tố cáo với cơ quan Nhà nước khi người sử dụng lao động vi phạm các qui định giao kết về ATLĐ, VSLĐ."
        ],
        "correctAnswerIndex": 1
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Tham gia khóa học huấn luyện an toàn, vệ sinh lao động trước khi sử dụng các máy, thiết bị, vật tư, chất có yêu cầu nghiêm ngặt về an toàn, vệ sinh lao động.",
            "Khiếu nại, tố cáo với cơ quan Nhà nước khi người sử dụng lao động vi phạm các qui định giao kết về ATLĐ, VSLĐ",
            "Gian lận trong các hoạt động kiểm định, huấn luyện an toàn, vệ sinh lao động.",
            "Rời bỏ nơi làm việc khi thấy rõ nguy cơ xảy ra TNLĐ và báo cáo với người trực tiếp quản lý biêt lý do và các nguy cơ đó."
        ],
        "correctAnswerIndex": 2
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Sử dụng máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về an toàn, vệ sinh lao động có kết quả kiểm định không đạt yêu cầu.",
            "Sử dụng máy thiết bị vật tư đã kiểm định rồi nhưng chưa hoàn tất thủ tục hồ sơ.",
            "Sử dụng máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về an toàn, vệ sinh lao động không có nguồn gốc, xuất xứ rõ ràng.",
            "Tất cả các hành vi nêu trên."
        ],
        "correctAnswerIndex": 3
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Ngăn chặn nguy cơ trực tiếp gây mất AT-VSLĐ, hành vi vi phạm quy định AT-VSLĐ tại nơi làm việc",
            "Sử dụng máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về an toàn, vệ sinh lao động không được kiểm định.",
            "Từ chối làm công việc hoặc rời bỏ nơi làm việc khi thấy rõ có nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng tính mạng hoặc sức khỏe của mình.",
            "Yêu cầu người sử dụng lao động bảo đảm điều kiện làm việc an toàn, vệ sinh, cải thiện điều kiện lao động."
        ],
        "correctAnswerIndex": 1
    },
    {
        "question": "Các hành vi nào sau đây bị nghiêm cấm trong ATVSLĐ:",
        "options": [
            "Từ chối làm việc khi thấy rõ nguy cơ xảy ra TNLĐ.",
            "Khiếu nại, tố cáo với cơ quan Nhà nước khi người sử dụng lao động vi phạm các qui định giao kết về ATLĐ, VSLĐ",
            "Làm công việc có yêu cầu nghiêm ngặt về ATVSLĐ khi chưa được huấn luyện, sát hạch và cấp chứng chỉ nghề, chứng chỉ về ATVSLĐ.",
            "Rời bỏ nơi làm việc khi thấy rõ nguy cơ xảy ra TNLĐ và báo cáo với người trực tiếp quản lý biêt lý do và các nguy cơ đó."
        ],
        "correctAnswerIndex": 2
    },
    {
        "question": "Luật An toàn, vệ sinh lao động số: 84/2015/QH13 ngày 25/06/2015, Người sử dụng lao động khi thực hiện trang cấp phương tiện bảo vệ cá nhân phải bảo đảm nguyên tắc nào dưới đây?",
        "options": [
            "Đúng chủng loại, đúng đối tượng, đủ số lượng, bảo đảm chất lượng theo tiêu chuẩn, quy chuẩn kỹ thuật quốc gia",
            "Không phát tiền thay cho việc trang cấp phương tiện bảo vệ cá nhân; không buộc NLĐ tự mua hoặc thu tiền của NLĐ để mua phương tiện bảo vệ cá nhân",
            "Hướng dẫn, giám sát người lao động sử dụng phương tiện bảo vệ cá nhân",
            "Các câu trả lời a, b và c đều đúng."
        ],
        "correctAnswerIndex": 3
    }
];
