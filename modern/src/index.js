"use strict";
const $doc = document;
const $submitBtn = $doc.querySelector("#submitBtn");
const $memoList = $doc.querySelector("#memoList");
const $text = $doc.querySelector(`input[type=text]`);
let $html = "";

$submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if ($text.value) {
    $html = `<li>${$text.value}<button id="deleteBtn">削除</button></li>`;
    $memoList.innerHTML += $html;
    $text.value = "";
  }
  const $deleteBtn = $doc.querySelectorAll("#deleteBtn");
  $deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentNode.remove();
    });
  });
});
