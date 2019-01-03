const dayStart = 0900;
const dayEnd = 1800;

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const times = [];
for (let i = 0; i < (dayEnd - dayStart) / 50; i++) {
  times.push(dayStart + Math.floor(i / 2) * 100 + (i % 2) * 30);
}

let nextColour = 1;
const assignedColours = {};

const tbody = document.querySelector("#main tbody");
const timeTbody = document.querySelector("#times tbody");

for (let row = 0; row < times.length; row++) {
  // Create the time column
  const time = times[row];
  if (row % 2 == 0) {
    const timeCell = document.createElement("th");
    const hour = Math.floor(time / 100);
    timeCell.innerText = `${hour % 12 || 12}${hour > 12 ? "pm" : "am"}`;
    timeCell.classList.add("time");
    const tr = document.createElement("tr");
    tr.append(timeCell);
    timeTbody.append(tr);
  }

  // Create the table
  const tableRow = document.createElement("tr");
  for (let column = 0; column < days.length; column++) {
    tableRow.append(document.createElement("td"));
  }
  tbody.append(tableRow);
}

// Load lectures
fetch("lectures.json")
.then(res => res.json())
.then(lectures => {
  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const row = times.indexOf(lecture.start) + 1;
    const col = days.indexOf(lecture.day);
    const length = Math.floor((lecture.end - lecture.start) / 50);
    const td = tbody.children[row].children[col];

    td.rowSpan = length;

    if (!assignedColours[lecture.name]) {
      assignedColours[lecture.name] = `var(--colour-${nextColour})`;
      nextColour++;
    }
    td.style["background-color"] = assignedColours[lecture.name];
    
    const name = document.createElement("div");
    name.innerText = lecture.name;
    name.classList.add("name");
    td.append(name);

    const location = document.createElement("div");
    location.innerText = lecture.location;
    location.classList.add("location");
    td.append(location);
  
    for (let j = 1; j < length; j++) {
      let c = 0;
      while (tbody.children[row + j].children[c].childNodes.length > 0) {
        c++;
      }
      tbody.children[row + j].children[c].remove();
    }
  }

  // Set the initial scroll position to date and time
  const maxScrollX = document.body.scrollWidth - window.innerWidth;
  const maxScrollY = document.body.scrollHeight - window.innerHeight;

  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  const scrollStepX = document.querySelector("#main").offsetWidth / 5;
  const timeWidth = document.querySelector("#times").offsetWidth;
  const scrollOffset = (window.innerWidth - timeWidth - scrollStepX) / 2;

  let scrollX = 0;

  // If Monday to Friday
  if (day > 0 && day < 6) {
    scrollX = scrollStepX * (day - 1) - scrollOffset;
    tbody.children[0].children[day - 1].style.fontWeight = "bold";
  }

  // If within timetable hours
  if (hour >= dayStart / 100 && hour < dayEnd / 100) {
    timeTbody.children[hour - dayStart / 100 + 1].children[0].style.fontWeight = "bold";
  }

  document.documentElement.scrollLeft = document.body.scrollLeft = scrollX;
});

