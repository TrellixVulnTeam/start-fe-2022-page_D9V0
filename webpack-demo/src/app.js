// app.js
import loadJson from './utils/loadJson.js';
import renderHTML from './utils/renderHtml.js';
import sortRecent from './utils/sortRecent.js';

const files = ["./class.json", "./quiz.json"];
const classBody = document.querySelector(".classBody");
const quizBody = document.querySelector(".quizBody");
const $classLoading = document.querySelector("#class_loading");
const $quizLoading = document.querySelector("#quiz_loading");
const $btn = document.querySelectorAll(".btn");

let flag = 'class';
let classFilter = 'all';
let quizFilter = 'quizall';

$classLoading.style.display = "none";
$quizLoading.style.display = "none";

readData();

// json 파일 읽기
function readData() {
    // console.log("-----READDATA-----");
    let data;

    loading();
    setTimeout(async function () {
        $classLoading.style.display = "none";
        $quizLoading.style.display = "none";
        for (let i = 0; i < files.length; i++) {
            data = await loadJson.loadJson(files[i]);
            displayData(i, data);
        }
    }, 1000);
    // console.log("----------");
}

// html 생성
function displayData(temp, data) {
    // console.log("-----DISPALYDATA-----");
    if (temp == 0) {
        classBody.innerHTML = data
            .map(
                (item, index) => renderHTML.renderClassHTML(item, index, classFilter)
            )
            .join("");
            return;
    } 
    if (temp == 1) {
        quizBody.innerHTML = data
            .map(
                (item) => renderHTML.renderQuizHTML(item, quizFilter)
            )
            .join("");
            return;
    }
    // console.log("----------");
}

// 리스트 필터 버튼 이벤트
for (var i = 0; i < $btn.length; i++) {
    $btn[i].addEventListener('click', (event) => {
        selectTab(event);
    });
}

// 리스트 필터
function selectTab(event) {
    // console.log("-----SELECTTAB-----");
    var i;
    for (i = 0; i < $btn.length; i++) {
        $btn[i].className = $btn[i]
            .className
            .replace(" active", "");
    }
    event.currentTarget.className += " active";
    if (event.currentTarget.value == 'all' || event.currentTarget.value == 'link' || event.currentTarget.value == 'git' || event.currentTarget.value == 'recent') {
        classFilter = event.currentTarget.value

        if (quizFilter == 'quizall') {
            $btn[4].className += " active";
        } else {
            $btn[5].className += " active";
        }

        flag = 'class';
        if (classFilter == 'recent') {
            setTimeout(function () {
                $classLoading.style.display = "none";
                $quizLoading.style.display = "none";
                sortRecent.sortRecent();
            }, 1000);
            loading();
            return;
        }
    } else {
        quizFilter = event.currentTarget.value;
        if (classFilter == 'all') {
            $btn[0].className += " active";
        } else if (classFilter == 'link') {
            $btn[1].className += " active";
        } else if (classFilter == 'git') {
            $btn[2].className += " active";
        } else {
            $btn[3].className += " active";
        }
        flag = 'quiz';
    }

    readData();
    // console.log("----------");
}

// 로딩
function loading() {
    // console.log("-----LOADING-----");
    if (flag == 'class') {
        $classLoading.style.display = "block";
    } else {
        $quizLoading.style.display = "block";
    }
    // console.log("----------");
}
