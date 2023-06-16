"use strict";

const $doc = document;
const $nextBtn = $doc.querySelector("#nextBtn");
const $prevBtn = $doc.querySelector("#prevBtn");

// Calendar
const weeks = ["日", "月", "火", "水", "木", "金", "土"];
const $week = $doc.querySelectorAll(".week");
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let startDate = new Date(year, month - 1, 1); //月初めの日付
let endDate = new Date(year, month, 0); //月末の日付
let endDateCount = endDate.getDate(); //月の末日
let startDay = startDate.getDay(); //月初めの曜日
const today = date.getDate(); //当日の日付
let $yearAndMonth = $doc.querySelector("#yearAndMonth"); //年月のh1書き換え用

const thisMonth = date.getMonth() + 1; //today削除用。月が変わっても当月を示す。
const thisYear = date.getFullYear(); //today削除用。月が変わっても当月を示す。

const $dateText = $doc.querySelectorAll("#dateText"); //日付入力のtd
const $dateSelect = $doc.querySelector("#dateSelect"); //日付候補入力エリア

// 曜日表示
for (let i = 0; i < weeks.length; i++) {
  $week[i].textContent = weeks[i];
} 

// カレンダーの日付生成
function calendar() {
  let dayCount = 1; //日付のカウント

  $yearAndMonth.textContent = `${year}年${month}月`;

  for (let d = 0; d < $dateText.length; d++) {
    if (d < startDay) {
      $dateText[d].textContent = "";
    } else if (dayCount > endDateCount) {
      $dateText[d].textContent = "";
    } else {
      $dateText[d].textContent = dayCount;
      dayCount++;
    }
  }

  if (thisMonth == month && thisYear == year) {
    $dateText.forEach(function (value) {
      if (value.textContent == today) {
        $dateText[today + startDay - 1].classList.add("today");
      }
      if (value.textContent < today) {
        for (let i = 0; i < today; i++) {
          $dateText[i + startDay - 1].classList.add("gray");
        }
      }
    })
  } else {
    $dateText.forEach((value) => {
      if (value.classList.contains("today") == true) {
        $doc.querySelector(".today").classList.remove("today");
      }
      if (value.classList.contains("gray") == true) {
        $doc.querySelector(".gray").classList.remove("gray");
      }
    });
  }
}
// 次月へ進む
const next = () => {
  $nextBtn.addEventListener("click", (e) => {
    // 翌月以降でprevボタン出現
    if (thisMonth <= month && thisYear <= year) {
      $doc.querySelector("#prevBtn").classList.remove("hide");
    }

    if (month > 11) {
      year += 1;
      month = 1;
      startDate = new Date(year, month - 1, 1); //月初めの日付
      endDate = new Date(year, month, 0); //月末の日付
      endDateCount = endDate.getDate(); //月の末日
      startDay = startDate.getDay(); //月初めの曜日
    } else {
      month += 1;
      startDate = new Date(year, month - 1, 1); //月初めの日付
      endDate = new Date(year, month, 0); //月末の日付
      endDateCount = endDate.getDate(); //月の末日
      startDay = startDate.getDay(); //月初めの曜日
    }
    e.preventDefault();

    calendar();
  });
};
// 前月へ戻る
const prev = () => {
  $prevBtn.addEventListener("click", (e) => {
    // 当月になったらprevボタン隠す
    if (thisMonth >= month - 1 && thisYear >= year) { //クリック時点で判断されるためmonth-1
      $doc.querySelector("#prevBtn").classList.add("hide");
    }

    if (month < 2) {
      year -= 1;
      month = 12;
      startDate = new Date(year, month - 1, 1); //月初めの日付
      endDate = new Date(year, month, 0); //月末の日付
      endDateCount = endDate.getDate(); //月の末日
      startDay = startDate.getDay(); //月初めの曜日
    } else {
      month -= 1;
      startDate = new Date(year, month - 1, 1); //月初めの日付
      endDate = new Date(year, month, 0); //月末の日付
      endDateCount = endDate.getDate(); //月の末日
      startDay = startDate.getDay(); //月初めの曜日
    }
    e.preventDefault();

    calendar();
  });
};

calendar();
next();
prev();

// 選択した日付をテキストエリアに入力
function dateSelect() {
  $dateText.forEach(function (select) {
    select.addEventListener("click", (p) => {
        let textDate = new Date(year, month - 1, p.target.textContent);
        textDate = textDate.getDay();
        console.log(weeks[textDate]);
        $dateSelect.value += `${month}/${p.target.textContent} (${weeks[textDate]})\n`;
    });
  });
}
dateSelect();
