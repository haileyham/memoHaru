let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

//메모하기
//입력값 '' 방지 추가
function saveNote(e) {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if(title == ''){
    alert('오늘의 제목은 무엇인가요? 제목을 입력해 주세요')
    e.preventDefault();
  }if(content == ''){
    alert('당신의 하루가 궁금해요')
    e.preventDefault();
  }

  allMemo.push({ title, content, len: allMemo.length });
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();

}

//render
function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  for (const item of allMemo) {
    const card = document.createElement("div"); 
    card.className = "card";
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    saveContent.className = "cardP";
    const deleteMemoBtn = document.createElement("button");


    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    deleteMemoBtn.textContent = "x";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");


    card.appendChild(deleteMemoBtn);
    card.appendChild(saveTitle);
    card.appendChild(saveContent);
    display.appendChild(card);
  }
}


//개별 삭제
function remove() {
  const idx = allMemo.find(
    (item) => item.len == event.target.id
  );

  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}


//전체 삭제
const del = document.querySelector('#delAll');
del.addEventListener('click', function () {
  allMemo.splice(0);
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
})


//오늘의 날짜
const time = new Date();
const year = time.getFullYear();
const month = String(time.getMonth() + 1).padStart(2, "0");
const day = String(time.getDate()).padStart(2, "0");
date.textContent = `${year}년 ${month}월 ${day}일`;


//dark mode
let badgeCount = 0;
document.querySelector('#badge').addEventListener('click', function () {
  badgeCount += 1;
  if (badgeCount % 2 == 1) {
    document.querySelector('#badge').innerHTML = 'Light Mode ⇔';
    document.querySelector('body').classList.add('dark');
    document.querySelector('.header').classList.add('darkHeader');
    document.querySelector('button').classList.add('darkBtn');
  } else {
    document.querySelector('#badge').innerHTML = 'Dark Mode ⇔';
    document.querySelector('body').classList.remove('dark');
    document.querySelector('.header').classList.remove('darkHeader');
    document.querySelector('button').classList.remove('darkBtn');
    document.querySelector('.memoBtn').classList.remove('memoBtnDark');
  }
})


//입력방지
