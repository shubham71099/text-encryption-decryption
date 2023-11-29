var clutter = "";

function emptyfieldtext() {
  const datavalidate = document.getElementById("txtmsg").value;

  if (!datavalidate) {
    alert("Please write text to encrypt");
    document.querySelector("#result").style.display = "none";
  } else {
    document.querySelector("#result").style.display = "block";
  }
}
function emptyfieldemoji() {
  const datavalidate = document.getElementById("emojimsg").value;

  if (!datavalidate) {
    alert("Please paste emoji to decrypt");
    document.querySelector("#result").style.display = "none";
  } else {
    document.querySelector("#result").style.display = "block";
  }
}

function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    var input = document.getElementById("txtmsg").value;
    console.log(input);
    // var pass = document.getElementById("password").value;
    // console.log(pass);

    const str = input.split("");
    console.log(str);

    str.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} `;
    });

    //console.log(clutter);

    document.querySelector("#result").innerHTML = clutter;

    var dataarr = [];

    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      console.log(dataarr);
      dataarr.push({ /*pass: password,*/ input: input, clutter: clutter });
    } else {
      dataarr = [{ /*pass: password,*/ input: input, clutter: clutter }];
    }

    localStorage.setItem("data1", JSON.stringify(dataarr));
  });
}

function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";
    var input2 = document.querySelector("#emojimsg").value;
    // var pass2 = document.querySelector("#finalpassword").value;

    var user = JSON.parse(localStorage.getItem("data1"));
    console.log(user);

    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
    });
    console.log(clutter2);

    var found;
    for (let i of user) {
      if (i.clutter == clutter2) {
        found = i;
        console.log(i);
      }
    }

    const datavalidate = document.getElementById("emojimsg").value;

    if (found && found.clutter === clutter2) {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "#eee";
      document.querySelector("#result").innerHTML = found.input;
    } else if (!datavalidate) {
      document.querySelector("#result").style.display = "none";
    } else {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "red";
      document.querySelector("#result").innerHTML =
        "Sorry !!! Emoji not found .... ";
    }
  });
}

function btnClicking() {
  // document.querySelector("button").addEventListener("click", function () {
  //   document.querySelector("#result").style.display = "block";
  // });

  document.querySelector("#dec-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#result").style.display = "none";
    document.querySelector("#main>h1 span img").style.rotate = "270deg";
  });

  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span img").style.rotate = "90deg";
    document.querySelector("#result").style.display = "none";
  });

  // document.querySelector("#encrypt-btn").addEventListener("click", function () {
  //   document.querySelector("#result").style.display = "block";
  // });
  // document.querySelector("#decrypt-btn").addEventListener("click", function () {
  //   document.querySelector("#result").style.display = "block";
  // });
}

encryption();

decryption();

btnClicking();
