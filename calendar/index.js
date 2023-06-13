'use strict';

const $doc = document;
const $nextBtn = $doc.querySelector('#nextBtn');
const $prevBtn = $doc.querySelector('#prevBtn');

// Calendar
const weeks = ['日', '月', '火', '水', '木', '金', '土']
const $week = $doc.querySelectorAll('.week');
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let startDate = new Date(year, month - 1, 1); //月初めの日付
let endDate = new Date(year, month, 0); //月末の日付
let endDayCount = endDate.getDate(); //月の末日
let startDay = startDate.getDay(); //月初めの曜日
const today = date.getDate(); //当日の日付
let $yearAndMonth = $doc.querySelector('#yearAndMonth'); //年月のh1書き換え用

const thisYear = date.getFullYear();
const thisMonth = date.getMonth() + 1;

// 曜日表示
for (let i = 0; i < weeks.length; i++) {
    $week[i].textContent = weeks[i];
}

const $dateText = $doc.querySelectorAll('#dateText'); //日付入力のtd

function calendar() {
    let dayCount = 1; //日付のカウント

    $yearAndMonth.textContent = `${year}年${month}月`;

    for (let d = 0; d < $dateText.length; d++) {
        if (d < startDay) {
            $dateText[d].textContent = '';
        } else if (dayCount > endDayCount) {
            $dateText[d].textContent = ''
        } else {
            $dateText[d].textContent = dayCount;
            dayCount++;
        }
    }

    // today付与
    if (thisYear == year && thisMonth == month) {
        $dateText.forEach(function (value) {
            if (value.textContent == today) {
                $dateText[today + startDay - 1].classList.toggle('today');
            }
        })
    }

    // 当月以外のtoday削除
    if (thisMonth != month) {
        $dateText.forEach((value) => {
            if (value.classList.contains('today') == true) {
                $doc.querySelector('.today').classList.remove('today');
            }
        })
    }
}

// 次月へ進む
const next = () => {
    $nextBtn.addEventListener('click', (e) => {
        month = month + 1;
        startDate = new Date(year, month - 1, 1); //月初めの日付
        endDate = new Date(year, month, 0); //月末の日付
        endDayCount = endDate.getDate(); //月の末日
        startDay = startDate.getDay(); //月初めの曜日

        e.preventDefault();

        calendar();
    })
}

// 前月へ戻る
const prev = () => {
    $prevBtn.addEventListener('click', (e) => {
        month = month - 1;
        startDate = new Date(year, month - 1, 1); //月初めの日付
        endDate = new Date(year, month, 0); //月末の日付
        endDayCount = endDate.getDate(); //月の末日
        startDay = startDate.getDay(); //月初めの曜日

        e.preventDefault();

        calendar();
    })
}
calendar();
next();
prev();
