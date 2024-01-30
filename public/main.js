// main.js...

// 1. GET request using fetch()
fetch(
  "https://us-central1-drasa-demo-6fd80.cloudfunctions.net/api/drasa_demo/all"
)
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    // 2. Create a variable to store HTML table headers
    let li = `<tr><th>ไอดี</th><th>ชื่อ</th><th>อีเมล</th><th>สถานะ</th><th>เลือกผู้ส่ง</th><th>ส่งข้อความ</th></tr>`;

    // 3. Loop through each data and add a table row
    json.forEach((user) => {
      li += `<tr>
        <td>${user.user_id} </td>
        <td>${user.name} </td>
        <td>${user.email}</td>
        <td>${user.status}</td>
        <td><input type="radio" name="gender" value="doctor">แพทย์
        <input type="radio" name="gender" value="nurse">พยาบาล</td>
        <td><button type="button" onclick="displayRadioValue('${user.user_id}')">
        ส่ง
        </button></td>
      </tr>`;
    });

    // 4. DOM Display result
    document.getElementById("users").innerHTML = li;
  });

// main.js

function displayRadioValue(userId) {
  var ele = document.getElementsByName("gender");
  console.log(userId);
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_id: userId,
        type: ele[i].value,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://us-central1-drasa-demo-6fd80.cloudfunctions.net/api/drasa_demo/customers/push",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  }
}
