'use strict';

const $doc = document;
const $nextBtn = $doc.querySelector('#nextBtn');
const $prevBtn = $doc.querySelector('#prevBtn');


// Calendar
const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let startDate = new Date(year, month - 1, 1); //月初めの日付
let endDate = new Date(year, month, 0); //月末の日付
let endDayCount = endDate.getDate(); //月の末日
let startDay = startDate.getDay(); //月初めの曜日
const today = date.getDate(); //当日の日付
let calendarHtml = '';



function showCalendar() {
    calendarHtml += `<h1 id='yearAndMonth'>${year}年${month}月</h1>`;
    calendarHtml += '<table class="calendar">';
    let dayCount = 1; //日付のカウント

    // 曜日の行
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += `<th class='week'>${weeks[i]}</th>`;
    };

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>'
        for (let d = 0; d < 7; d++) {
            if (w === 0 && d < startDay) { //月初より前に空白
                calendarHtml += '<td>' + '</td>';
            } else if (dayCount > endDayCount) { // 月末日以降に空白
                calendarHtml += '<td>' + '</td>';
            } else if (dayCount < today) { //当日より前をグレーアウトさせるためのクラス
                calendarHtml += `<td class='gray'>${dayCount}</td>`;
                dayCount++;
            } else if (dayCount === today) {
                calendarHtml += `<td class='today'>${dayCount}</td>`;
                dayCount++;
            } else {
                calendarHtml += `<td>${dayCount}</td>`;
                dayCount++;
            }
        }
        calendarHtml += '</tr>';
    }

    calendarHtml += '</table>'

    document.getElementById('calendar').innerHTML = calendarHtml;
}

showCalendar();

