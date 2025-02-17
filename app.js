const download = document.querySelector(".download");
const share = document.querySelector(".share");
const forecolor = document.querySelector(".light");
const backcolor = document.querySelector(".darkss");
const qrContainer = document.querySelector("#qr-code");
const inputtext = document.querySelector("#qr-text");
const size = document.querySelector("#sizes");

const img = document.createElement("img");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

qrContainer.appendChild(img);
qrContainer.appendChild(canvas);

const sizes = ["200 ", "300 ", "400 ", "500 ", "600 ", "700 "];
const defaultUrl = "dfgdfg";

let color = "";
let initialSize = 300;
let colors = "";
let text = defaultUrl;

sizes.map((value) => {
  let opt = document.createElement("option");
  opt.value = value;
  opt.innerHTML = value;
  size.appendChild(opt);
});

backcolor.addEventListener("input", handledarkcolor);
forecolor.addEventListener("input", handlelightcolor);
size.addEventListener("change", handlesize);
inputtext.addEventListener("input", handleQrText);
share.addEventListener("click", handleShare);

function handledarkcolor(e) {
  console.log(e.target.value);

  colors = e.target.value;
  generateQRcode();
}
function handlelightcolor(e) {
  color = e.target.value;
  generateQRcode();
}
function handlesize(e) {
  console.log(e.target.value);

  initialSize = e.target.value;
  // console.log(initialSize);
  generateQRcode();
}
function handleQrText(e) {
  text = e.target.value;
  console.log(text);

  if (!text) {
    text = defaultUrl;
  }
  generateQRcode();
}
// The main three function

async function handleShare(e) {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      // console.log("this is from share")
      console.log(base64url);
      console.log(fetch(base64url));
      const blob = await (await fetch(base64url)).blob();
      console.log(blob);
      const file = new File([blob], "QRCode.png", { type: blob.type });
      console.log(file);
      await navigator.share({
        files: [file],
        url: "https://example.com",
      });
      // mmake an obj literal
    } catch (e) {
      alert("YOur browser  doesn'r support Sharing . ");
    }
  }, 50);
}

async function generateQRcode() {
  console.log(colors);
  console.log(color);
  console.log(initialSize);

  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    width: initialSize,
    height: initialSize,
  });

  let xxx = await resolveDataUrl();
  console.log("this is of download");
  console.log(xxx);
  download.href = xxx;
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      console.log("line 113");
      console.log(img);
      if (img.currentSrc) {
        console.log(img.currentSrc);
        resolve(img.currentSrc);
        return;
      } else {
        const canvas = document.querySelector("#qr-code canvas");
        // console.log(canvas);
        console.log(canvas.toDataURL());
        resolve(canvas.toDataURL());
      }

      reject("sorry Sir! will be fixing this soon!");
    }, 50);
  });
}

generateQRcode();
