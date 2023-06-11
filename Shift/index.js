'use strict';
// Calendar
const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const startDate = new Date(year, month - 1, 1); //月初めの日付
const endDate = new Date(year, month, 0); //月末の日付
const endDayCount = endDate.getDate(); //月の末日
const startDay = startDate.getDay(); //月初めの曜日
const today = date.getDate(); //当日の日付
let dayCount = 1; //日付のカウント
let calendarHtml = '';

calendarHtml += `<h1>${year}年${month}月</h1>`;
calendarHtml += '<table class="calendar">';
calendarHtml += '<>';


// 曜日の行
for (let i = 0; i < weeks.length; i++) {
    calendarHtml += `<th class='week'>${weeks[i]}</th>`;
};

for (let w = 0; w < 6; w++) {
    calendarHtml += '<tr>'

    for (let d = 0; d < 7; d++) {
        if (w === 0 && d < startDay) {   //月初より前に空白
            calendarHtml += '<td>' + '</td>';
        } else if (dayCount > endDayCount) {  // 月末日以降に空白
            calendarHtml += '<td>' + '</td>';
        } else if(dayCount < today) {  //当日より前をグレーアウトさせるためのクラス
            calendarHtml += `<td class='gray'>${dayCount}</td>`;
            dayCount++;
        } else {
            calendarHtml += `<td>${dayCount}</td>`;
            dayCount++;
        }
    }
    calendarHtml += '</tr>'
}
calendarHtml += '</table>'

document.getElementById('calendar').innerHTML = calendarHtml;

