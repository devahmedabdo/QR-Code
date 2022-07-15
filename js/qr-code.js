window.addEventListener("load", () => {
  document.querySelector(".loading").classList.remove("loaading");
  setTimeout(() => {
    document.querySelector(".loading").style = `
    opacity:0;
    z-index:-1 ;
    transition:1s   
    `;
  }, 3000);
});

////////////

let text = document.querySelector("#url");
let bgColor = document.querySelector("#bg-color");
let color = document.querySelector("#qr-color");
let type = document.querySelector("select");
let size = document.querySelector(".size");
let margin = document.querySelector(".margin");
let number = document.querySelectorAll(".input-number");

number.forEach((ele) => {
  ele.nextElementSibling.addEventListener("click", () => {
    if (+ele.value + +ele.getAttribute("step") < +ele.getAttribute("max")) {
      ele.value = +ele.value + +ele.getAttribute("step");
    } else {
      ele.value = +ele.getAttribute("max");
    }
  });
  ele.previousElementSibling.addEventListener("click", () => {
    if (+ele.value - +ele.getAttribute("step") > +ele.getAttribute("min")) {
      ele.value = +ele.value - +ele.getAttribute("step");
    } else {
      ele.value = +ele.getAttribute("min");
    }
  });
});
/////////////

size.addEventListener("blur", () => {
  if (+size.value > size.getAttribute("max")) {
    size.value = size.getAttribute("max");

    if (
      type.value == "png" ||
      type.value == "jpg" ||
      type.value == "jpeg" ||
      type.value == "png" ||
      type.value == "gif"
    ) {
      alert("Maximum Size For This Type Is 1000px Try EPS Or SVG");
    } else {
      alert("Maximum Size For This Type Is 100000px");
    }
  } else if (+size.value < size.getAttribute("min")) {
    size.value = size.getAttribute("min");
    alert("Minimum Size Is 10px");
  }
});

margin.addEventListener("blur", () => {
  if (+margin.value > margin.getAttribute("max")) {
    margin.value = margin.getAttribute("max");
    alert("Maximum Margin Is 50px");
  } else if (+margin.value < margin.getAttribute("min")) {
    margin.value = margin.getAttribute("min");
    alert("Minimum Margin Is 0px");
  }
});

/////////////
type.addEventListener("change", () => {
  if (type.value == "svg" || type.value == "eps") {
    size.setAttribute("max", "1000000");
  } else {
    size.setAttribute("max", "1000");
  }
});
//////////////

let downloadBtn = document.querySelector("button:nth-child(2)");
let dataBox = document.querySelectorAll(".qr-box input ,.qr-box select ");
let numberBtn = document.querySelectorAll(".number-div span");
numberBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    setHref();
  });
});
dataBox.forEach((ele) => {
  ele.addEventListener("change", () => {
    setHref();
  });
});

let url = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${
  size.value
}&data=${text.value}&margin=${margin.value}&bgcolor=${color.value.slice(
  1
)}&color=${bgColor.value.slice(1)}&format=${type.value}.${type.value}`;
let setHref = () => {
  url = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${
    size.value
  }&data=${text.value}&margin=${margin.value}&bgcolor=${color.value.slice(
    1
  )}&color=${bgColor.value.slice(1)}&format=${type.value}.${type.value}`;
};

downloadBtn.addEventListener("click", () => {
  downloadBtn.innerText = "Downloading";
  fetchFile(url);
});

function fetchFile(url) {
  if (type.value == "svg" || type.value == "eps") {
    url = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${
      size.value
    }&data=${text.value}&margin=${margin.value}&bgcolor=${color.value.slice(
      1
    )}&color=${bgColor.value.slice(1)}&format=${type.value}`;

    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = "Ahmed Abdo QR";
    document.body.appendChild(aTag);
    aTag.click();
    downloadBtn.innerText = "Save File";
    aTag.remove();
    console.log(url);
  } else {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        aTag.click();
        downloadBtn.innerText = "Save File";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
      })
      .catch(() => {
        alert("Failed to download file!");
        downloadBtn.innerText = "Save File";
      });
  }
}

let imgPreview = document.querySelector(".img-preview img");
let generate = document.querySelector("button");
generate.addEventListener("click", () => {
  imgPreview.src = `https://api.qrserver.com/v1/create-qr-code/?size=${
    size.value
  }x${size.value}&data=${text.value}&margin=${
    margin.value
  }&bgcolor=${color.value.slice(1)}&color=${bgColor.value.slice(1)}&format=png`;
});
////
// dark mode btn

let sun = document.querySelector(".mode svg");
let moon = document.querySelector(".fa-moon");

if (window.localStorage.getItem("colorMode") != "") {
  document.body.classList.add(window.localStorage.getItem("colorMode"));
}

sun.onclick = function () {
  window.localStorage.setItem("colorMode", "");
  document.body.classList.remove("moon");
};

moon.onclick = function () {
  window.localStorage.setItem("colorMode", "moon");
  document.body.classList.add("moon");
};
