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
let $yearAndMonth = $doc.querySelector('#yearAndMonth');

let dayCount = 1; //日付のカウント

$yearAndMonth.textContent = `${year}年${month}月`;

// 曜日を入力
for (let i = 0; i < weeks.length; i++) {
    $week[i].textContent = weeks[i];
};

// td取りたい
const $dateText = $doc.querySelectorAll('#dateText');

for (let d = 0; d < $dateText.length; d++) {
    if (d < startDay) {
        $dateText[d].textContent = '';
    } else if (dayCount > endDayCount) {
        $dateText[d].textContent = ''
    } else {
        $dateText[d].textContent = dayCount;
        dayCount++;
    }
    if(dayCount === today) {
        console.log($dateText[d].textContent)
        $dateText[d+1].classList.add('today');
    }
    if($dateText[dayCount].textContent < today) {
        $dateText[dayCount].classList.add('gray');
    }
};

