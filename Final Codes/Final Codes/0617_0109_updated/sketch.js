const modelURL = 'https://teachablemachine.withgoogle.com/models/hxvU9NBJY/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";
const flip = true;

let supbase64Image;
let finalQrCodeBase64 = '';

let api_key;

const supabase = createClient(
  'https://xnlxdxanawcdzmembdfs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubHhkeGFuYXdjZHptZW1iZGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NjM3MTAsImV4cCI6MjAzMzIzOTcxMH0.q_I_74YmbCtC80U7kCL-CbJnyK05DMhNs5caJizczZQ'
);

const dataURLtoFile = (dataurl, fileName) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

function getGMTDate() {
  const now = new Date();
  const gmtNow = new Date(now.toUTCString());
  return gmtNow;
}

function updateQRCode() {
  const now = getGMTDate();
  const fileName = now.toISOString().replace(/:/g, '').replace(/-/g, '').replace('T', '_').slice(0, 13) + '.jpg';
  const imageUrl = `https://xnlxdxanawcdzmembdfs.supabase.co/storage/v1/object/public/y2k/public/${fileName}`;
  
  new QRCode(document.getElementById("finalqr"), {
    text: imageUrl,
    width: 200, // QR 코드의 너비
    height: 200, // QR 코드의 높이
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  setTimeout(() => {
    saveQRCodeToBase64();
  }, 500);
}

function saveQRCodeToBase64() {
  const qrCodeElement = document.getElementById("finalqr");
  const qrCode = new QRCode(qrCodeElement, {
    text: '', // Placeholder text, will be updated later
    width: 120, // QR 코드의 너비
    height: 120, // QR 코드의 높이
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  const canvas = qrCodeElement.querySelector('canvas');
  if (canvas) {
    finalQrCodeBase64 = canvas.toDataURL('image/png');
    console.log(finalQrCodeBase64); // For testing purposes
  } else {
    console.error('QR code canvas not found.');
  }
}

async function uploadImageToSupabase(imageData) {
  console.log("upload Image")
  // today date
  const now = getGMTDate();
  // file name 'YYYYMMDD_HHMM.jpg'
  const fileName = now.toISOString().replace(/:/g, '').replace(/-/g, '').replace('T', '_').slice(0, 13) + '.jpg';

  // creating file
  const imageFile = dataURLtoFile(imageData, fileName)

  // upload to storage
  const { data, error } = await supabase.storage
    .from("y2k")
    .upload("public/" + fileName, imageFile, {
      contentType: "image/jpg",
      cacheControl: "3600",
      upsert: false,
    });

  updateQRCode();
}
  

/*async function uploadImageAndGetUrl(image) {
  const { data, error } = await supabase.storage
    .from("photos")
    .upload("saved_photo.jpg", image, {
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  if (data) {
    console.log("Image uploaded successfully:", data);
    return data.url;
  }
}*/
/*async function nextStage() {
  // savedPhoto 이미지 업로드
  const imageUrl = await uploadImageAndGetUrl(savedPhoto);

  if (imageUrl) {
    // QR 코드 이미지 생성
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${imageUrl}&size=200x200`;

    // QR 코드 이미지를 화면에 표시
    const qrCodeImage = loadImage(qrCodeImageUrl, () => {
      image(qrCodeImage, 100, 100); // 화면에 표시할 위치 조정
    });
  } else {
    console.error("Failed to upload image to Supabase.");
  }
}*/

let model;
let totalClasses;
let myCanvas;

let classification = "None Yet";
let probability = "100";
let poser;
let video;

let startRecording = false; // 녹화 시작 여부
let startTime;
let recordingDuration = 5000;

let countdown = 5;
let lastPhoto;

//사진 변수
let img_main1;
let img_main2;
let img_main3;
let img_main4;
let img_main5;
let img_main6;
let img_main7;
let img_main8;
let img_main9;
let img_main10;
let img_main11;
let img_main12;
let img_main13;
let img_main14;
let img_main15;
let deco1;
let deco2;
let deco3;
let deco4;
let deco5;
let instructor;
let logoutImg;
let showLogoutImg = false;


let img_analogcomp;
let defaultpfp;
let cyworldlogo;
let gamsung = [];
let haduri;
let pfp1;
let pfp2;
let pfps1 = [];
let pfps2 = [];
let current = 0;
let bgImage;
let anycallImg;
let canmore;
let xp;
let message;
let login;
let login2;
let hand;

let cam;
let saveButton;
let nextButton;
let clearButton;
let shutdownButton;
let usernameInput;
let passwordInput;
let usernameValue = '';
let passwordValue = '';

let photos = [];
let photoCount = 0;
const maxPhotos = 4;
let drawing = []; // 사용자가 그린 그림을 저장할 배열
let brushColor = 'black'; // 초기 브러쉬 색은 black
let currentPath = []; // 현재 경로를 저장할 배열

let lightPinkButton, lightBlueButton, lightGreenButton, lavenderButton, blackButton, undoButton;

let finalButton;

let savedPhoto;

let stickers = [];
let stickerObjects = [];
let selectedSticker = null;
let offsetX, offsetY;

let dosGothic;
let barcodeF;
let stage = 0;
let bg_a = false;
let bg_b = false;
let changeFrameRate = false;

let qr_test;
let qrImage;
let bubble;
let minime;
let mini1;
let mini2;
let finalqr;

let segmenter;
let segmentationData = [];

let delay1 = 3000; // 3초후 login2
let delay2 = 500; // 0.5초후 login
let currentImage = 1; // 현재 표시 중인 이미지
let lastImageChangeTime = 0;

//computer
c_xl = 1200;
c_xh = 1600;
c_yl = 450;
c_yh = 897;

//login button
l_xl = 860;
l_xh = 1060;
l_yl = 790;
l_yh = 890;

//pfp button
p_xl = 360;
p_xh = 625;
p_yl = 280;
p_yh = 450;

//pfp1 button
p1_xl = 750;
p1_xh = 1110;
p1_yl = 250;
p1_yh = 610;

//pfp2 button
p2_xl = 1110;
p2_xh = 1470;
p2_yl = 370;
p2_yh = 730;

//qr yes button
q1_xl = 1005;
q1_xh = 1155;
q1_yl = 318;
q1_yh = 362;

//qr no button
q2_xl = 1196;
q2_xh = 1352;
q2_yl = 314;
q2_yh = 359;

//next button
n1_xl = 1340;
n1_xh = 1480;
n1_yl = 875;
n1_yh = 925;

//final button
let f1_x1 = 1473;
let f1_y1 = 760;
let f1_x2 = 1749;
let f1_y2 = 820;

let today = new Date();
let year = today.getFullYear() - 20;
let month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
let day = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
let randomScrap1 = 0;
let randomScrap2 = 201;
let randomScrap3 = 801;
let randomScrap4 = 2001;
let randomToday1 = 0;
let randomToday2 = 501;
let randomToday3 = 1001;
let randomToday4 = 12001;
let randomTotal1 = 0;
let randomTotal2 = 501;
let randomTotal3 = 2001;
let randomTotal4 = 20001;
let randomBright = 0;
//text dialogues

let dialogues = {
  1:["Back To Y2K!\n진행을 위해 마우스로 화면을 클릭하세요!  >>","이 버튼만 누르면 2004년으로 돌아갈 수 있다고?  >>","궁금하면 OK버튼을 눌러봐  >>"],
  3: ["...","엇 이게 뭐지..?\n아이디가 뭐였더라...  >>",
    "일단 아무거나 입력해보자  >>","*ID/PW는 마지막 영수증에 함께 출력될 예정이니 임의로 작성해주세요\n*입력 후 ENTER를 눌러 다음으로 넘어가주세요"],
  5: ["텅 빈 미니홈피다.  >>",
    "방문자가 0명이네\n일단 프로필부터 채워보자  >>",
    "왼쪽의 비어있는 프로필 사진을 클릭해보자."],
  7: ["마음에 드는 프로필을 골라보자."],
  9: ["여전히 휑한 미니홈피다.\n좀 꾸며볼까  >>"],
  12: ["첫 사진을 올렸다.\n벌써 반응이 온다!  >>"],
  13: ["방문자가 늘어났다!\n계속해서 사진첩을 올려볼까?  >>"],
  15: ["오늘은 Łйㄱr 제일 ħØŧぁĦ . .. ...  >>"],
  16: ["어쩐지 가구도 늘어난것 같아  >>"],
  18: ["이번건 좀 잘나온듯.  >>"],
  19: ["마 ! 니 미니홈피 중독이다.\n이제 마지막 사진을 찍자.  >>"],
  21: ["오늘의 추억을 네컷 사진으로 남기고 싶다면...  >>"]
};


let dialogueIndex = 0; // 현재 대화 인덱스
let inDialogue = true; // 대화 중인지 여부를 추적



function preload() {
  gothic = loadFont("assets/Pretendard-Medium.ttf");
  dosGothic = loadFont("assets/DOSGothic.ttf");
  barcodeF = loadFont("assets/barcode.ttf");
  img_main1 = loadImage("assets/1.png");
  img_main2 = loadImage("assets/2.png");
  img_main3 = loadImage("assets/3.png");
  img_main4 = loadImage("assets/4.png");
  img_main5 = loadImage("assets/5.png");
  img_main6 = loadImage("assets/6.png");
  img_main7 = loadImage("assets/7.png");
  img_main8 = loadImage("assets/8.png");
  img_main9 = loadImage("assets/9.png");
  img_main10 = loadImage("assets/10.png");
  img_main11 = loadImage("assets/11.png");
  img_main12 = loadImage("assets/12.png");
  img_main13 = loadImage("assets/13.png");
  img_main14 = loadImage("assets/14.png");
  img_main15 = loadImage("assets/15.png");
  img_analogcomp = loadImage("assets/pngegg.png");
  defaultpfp = loadImage("assets/l60Hf.png");
  cyworldlogo = loadImage("assets/cyworldlogo.png");
  haduri = loadImage("assets/haduri.png");
  pfp1 = loadImage("assets/pfp1.png");
  pfp2 = loadImage("assets/pfp2.png");
  bgImage = loadImage('assets/background.jpg');
  anycallImg = loadImage('assets/anycall.png'); // anycall 이미지를 preload 함수 내에서 로드
  qr_test = loadImage('assets/qr.png');
  bubble = loadImage("assets/pixel-speech-bubble.png");
  minime = loadImage("assets/minime.png");
  mini1 = loadImage("assets/mini_1.png");
  mini2 = loadImage("assets/mini_2.png");
  canmore = loadImage("assets/canmore.jpg");
  xp = loadImage("assets/window.jpg");
  message = loadImage("assets/message.png");
  login = loadImage("assets/login.png");
  login2 = loadImage("assets/login2.png");
  hand = loadImage("assets/hand.png");
  anycall = loadImage("assets/anycall.png");
  deco1 = loadImage("assets/deco_sticker.png");
  deco2 = loadImage("assets/deco_pen.png");
  deco3 = loadImage("assets/deco_finish.png");
  deco4 = loadImage("assets/deco_print.png");
  deco5 = loadImage("assets/qrcode.png");
  instructor = loadImage("assets/0.png");
  finalButton = loadImage("assets/finalButton.png");

  for (let i = 0; i < 15; i++) {
    pfps1[i] = loadImage("assets/pfp1_" + i + ".png");
    pfps2[i] = loadImage("assets/pfp2_" + i + ".png");
  }

  for (let i = 0; i < 6; i++) {
    gamsung.push(loadImage('assets/inso' + i + '.png'));
  }

  stickers.push(loadImage('assets/angry.png'));
  stickers.push(loadImage('assets/bandage.png'));
  stickers.push(loadImage('assets/cat.png'));
  stickers.push(loadImage('assets/drawing.png'));
  stickers.push(loadImage('assets/flower1.png'));
  stickers.push(loadImage('assets/flower2.png'));
  stickers.push(loadImage('assets/flower3.png'));
  stickers.push(loadImage('assets/heart.png'));
  stickers.push(loadImage('assets/ng.png'));
  stickers.push(loadImage('assets/triangle.png'));
}

async function load() { // async 추가
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function setup() { // async 추가
  myCanvas = createCanvas(1920, 1080);
  camPixelsCanvas = createCanvas(640, 480);

  await load(); // await 사용

}

function setup() {
  frameRate(10);

  api_key = prompt("Enter your API key")
  console.log(api_key)

  logoutImg = createImg("assets/logout.gif");
  //logoutImg.size(width, height); 
  logoutImg.position(0,0);
  logoutImg.hide();

  qrcode = createDiv();
  qrcode.id('finalqr');
  qrcode.position(1180, 200);
  qrcode.hide();

  createCanvas(1920, 1080);
  noStroke();
  cam = createCapture(VIDEO, camReady);
  cam.size(640, 480);
  cam.hide();
  //username
  usernameInput = createInput();
  usernameInput.position(width / 2 - 120, height / 2 + 20);
  usernameInput.size(500, 50);
  usernameInput.hide();

  passwordInput = createInput();
  passwordInput.position(width / 2 - 120, height / 2 + 120);
  passwordInput.size(500, 50);
  passwordInput.hide();
  // 스티커 나열 위치 좌표
  let startX = 210;
  let startY = 160;
  let spacingX = 95;
  let spacingY = 95;
  let stickersPerRow = 2;

  for (let i = 0; i < stickers.length; i++) {
    let img = stickers[i];
    let aspectRatio = img.width / img.height;
    let targetHeight = 75; // 스티커 높이 맞춤
    let targetWidth = targetHeight * aspectRatio;

    let row = Math.floor(i / stickersPerRow);
    let col = i % stickersPerRow;

    stickerObjects.push({
      img: img,
      x: startX + col * spacingX,
      y: startY + row * spacingY,
      width: targetWidth,
      height: targetHeight,
      angle: 0
    });
  }

  // 브러쉬 색 변경 버튼
  blackButton = createButton('');
  blackButton.style('font-family', 'DosGothic');
  blackButton.style('font-size', '24px');
  blackButton.style('color', color(255));
  blackButton.style('background-color', 'transparent'); //버튼색 투명
  blackButton.size(50, 50);
  blackButton.position(430, 267);
  blackButton.style('border', 'none');
  blackButton.style('cursor', 'pointer');
  blackButton.mousePressed(() => { brushColor = 'black'; });
  blackButton.hide();

  lightPinkButton = createButton('');
  lightPinkButton.style('font-family', 'DosGothic');
  lightPinkButton.style('font-size', '25px');
  lightPinkButton.style('background-color', 'transparent'); //버튼색 투명
  lightPinkButton.size(50, 50);
  lightPinkButton.position(430, 323);
  lightPinkButton.style('border', 'none');
  lightPinkButton.style('cursor', 'pointer');
  lightPinkButton.style('text-align', 'center');
  lightPinkButton.mousePressed(() => { brushColor = 'pink'; });
  lightPinkButton.hide();

  lightBlueButton = createButton('');
  lightBlueButton.style('font-family', 'DosGothic');
  lightBlueButton.style('font-size', '25px');
  lightBlueButton.style('background-color', 'transparent'); //버튼색 투명
  lightBlueButton.size(50, 50);
  lightBlueButton.position(430, 380);
  lightBlueButton.style('border', 'none');
  lightBlueButton.style('cursor', 'pointer');
  lightBlueButton.style('text-align', 'center');
  lightBlueButton.mousePressed(() => { brushColor = 'lightblue'; });
  lightBlueButton.hide();

  lavenderButton = createButton('');
  lavenderButton.style('font-family', 'DosGothic');
  lavenderButton.style('font-size', '15px');
  lavenderButton.style('background-color', 'transparent'); //버튼색 투명
  lavenderButton.size(73, 73);
  lavenderButton.position(430, 437);
  lavenderButton.style('border', 'none');
  lavenderButton.style('cursor', 'pointer');
  lavenderButton.mousePressed(() => { brushColor = 'lavender'; });
  lavenderButton.hide();

  lightGreenButton = createButton('');
  lightGreenButton.style('font-family', 'DosGothic');
  lightGreenButton.style('font-size', '24px');
  lightGreenButton.style('background-color', 'transparent'); //버튼색 투명
  lightGreenButton.size(50, 50);
  lightGreenButton.position(430, 493);
  lightGreenButton.style('border', 'none');
  lightGreenButton.style('cursor', 'pointer');
  lightGreenButton.mousePressed(() => { brushColor = 'lightgreen'; });
  lightGreenButton.hide();


  // Undo 버튼 생성
  undoButton = createButton('');
  undoButton.style('background-color', 'transparent'); //버튼색 투명
  undoButton.size(50, 50);
  undoButton.position(430, 548);
  undoButton.style('border', 'none');
  undoButton.style('cursor', 'pointer');
  undoButton.mousePressed(() => {
    if (drawing.length > 0) {
      drawing.pop(); // 마지막 경로를 삭제
    }
  });
  undoButton.hide();

  clearButton = createButton('');
  clearButton.style('font-family', 'DosGothic');
  clearButton.style('background-color', 'transparent'); //버튼색 투명
  clearButton.style('border', 'none');
  clearButton.style('font-size', '24px');
  clearButton.position(430, 606);
  clearButton.size(50, 50);
  clearButton.style('cursor', 'pointer'); // 마우스 커서 모양을 손가락 모양으로 변경
  clearButton.mousePressed(clearDrawing); // 클릭 시 clearDrawing 함수 호출
  clearButton.hide();


  nextButton = createButton('');
  nextButton.style('font-family', 'DosGothic');
  nextButton.style('font-size', '25px');
  nextButton.style('background-color', 'transparent'); //버튼색 투명 
  nextButton.size(187, 55);
  nextButton.position(1473, 767); // Adjust position as needed
  nextButton.style('border', 'none');
  nextButton.style('cursor', 'pointer');
  nextButton.mousePressed(nextStage);
  nextButton.hide();

  shutdownButton = createButton('');
  shutdownButton.size(300, 54);
  shutdownButton.position(35, 970); // Adjust position as needed
  shutdownButton.style('border', 'none');
  shutdownButton.mousePressed(shutDown);
  shutdownButton.hide();
  shutdownButton.style('background-color', 'transparent');
  shutdownButton.style('cursor', 'pointer');
  shutdownButton.mouseOver(changeButtonColor);
  shutdownButton.mouseOut(resetButtonColor);

  //과거로 회귀하는 버튼 생성
  backButton = createButton('');
  backButton.size(150, 52);
  backButton.position(880, 605); // Adjust position as needed
  backButton.mousePressed(backY2K);
  backButton.style('border-radius', '10%');
  backButton.style('border', 'none');
  backButton.style('background-color', 'transparent');
  backButton.style('cursor', 'pointer');
  backButton.mouseOver(changeButtonColor);
  backButton.mouseOut(resetButtonColor);
  backButton.hide();

  //사진 저장 버튼
  saveButton = createButton('찰칵!');
  saveButton.style('font-family', 'DosGothic');
  saveButton.style('background-color', 'transparent'); //버튼색 투명
  saveButton.style('border', 'none');
  saveButton.style('color', 'rgb(65,76,232)');
  saveButton.style('font-size', '40px');
  saveButton.style('cursor', 'pointer');
  saveButton.size(150, 80);
  saveButton.position(1250, 750); // Adjust position as needed
  saveButton.mousePressed(handleButtonClick); // Call savePicture after 5 seconds
  saveButton.hide();
  saveButton.mouseOver(changeButtonColor);
  saveButton.mouseOut(resetButtonColor);


}

function draw() {

  if (showLogoutImg) {
    logoutImg.show(); // 로그아웃 이미지를 보여줌
  } else {
    logoutImg.hide(); // 로그아웃 이미지를 숨김
  }

 if (inDialogue) {
    console.log(`Stage: ${stage}, Dialogue Index: ${dialogueIndex}`);
    if (dialogues[stage] && dialogueIndex < dialogues[stage].length) {
      rectMode(CENTER);
      fill(10, 47, 245);
      rect(978, 848, 1200, 210,10);
      fill(255);
      rect(978, 863, 1190, 170 );
      textAlign(LEFT);
      fill(0);


      textFont('DosGothic');
      textSize(30);
      text(dialogues[stage][dialogueIndex], 500, 850);

    } else {
      inDialogue = false;
      dialogueIndex = 0;
    }
  } else {
    switch (stage) {
      case 0:
      shutdownButton.hide();
      //첫 화면-입장하기
      /*background(206, 233, 246);
      rectMode(CENTER);
      //fill(164,199,231);
      fill(195, 195, 195);
      rect(width / 2, height - 150, width, 300);

      //clickover
      if (c_xl < mouseX && mouseX < c_xh && c_yl < mouseY && mouseY < c_yh) {
        // fill(255,255,0,100);
        push();
        drawGlow(1400, 650, 250);
        pop();
      }

      fill(0);
      rect(1400, 650, 250, 300);
      image(img_analogcomp, 1200, 450);
      textAlign(CENTER);
      textSize(30);
      textFont(dosGothic);
      fill(255);
      text("hello!", 1400, 620);

      //title
      fill(0);
      textAlign(LEFT);
      textSize(200);
      textFont(dosGothic);
      text("정문기입 타이틀", 100, 300);
      textSize(50);
      text("컴퓨터를 눌러주세요......", 120, 400);*/
if (randomBright <256) {
        let increment = int(random(20));
        randomBright += increment;
      }
      randomBright = min(randomBright, 255);
      if (randomBright >= 255) {
        image(xp, 0, 0, 1920, 1080);

        push();
        translate(0, 0);
        imageMode(CENTER);
        image(message, width / 2, height / 2);
        pop();
        
        textAlign(CENTER);
        textSize(50);
        textFont(dosGothic);
        text("click anywhere to start!",width/2, height*3/4);

      }
  
        else{
      
      fill(int(randomBright));
      rect(0,0,width,height);
        }

      break;

        case 1:
        image(xp, 0, 0, 1920, 1080);
        push();
        translate(0, 0);
        imageMode(CENTER);
        image(message, width / 2, height / 2);
        pop();
        inDialogue = true;
        break;

        case 2:
          inDialogue = false;
          image(xp, 0, 0, 1920, 1080);
          push();
          translate(0, 0);
          imageMode(CENTER);
          image(message, width / 2, height / 2);
          pop();
        backButton.show();
        

  break;




   case 3:
        inDialogue = true;
        backButton.hide();

        push();
        imageMode(CENTER);
        let currentTime = millis();

        // 마지막 이미지 변경 이후로 지난 시간
        let elapsedTime = currentTime - lastImageChangeTime;

        if (currentImage === 1) {
          image(login, width / 2, height / 2);
          inDialogue = true;
          if (elapsedTime > delay1) { // delay1 이후
            currentImage = 2; // 다음 이미지로 변경
            lastImageChangeTime = currentTime; // 마지막 이미지 변경 시간 업데이트
          }
        }
        else if (currentImage === 2) {
          inDialogue = true;
          image(login2, width / 2, height / 2);
          if (elapsedTime > delay2) { // delay2 이후
            currentImage = 1; // 다음 이미지로 변경
            lastImageChangeTime = currentTime; // 마지막 이미지 변경 시간 업데이트
          }

        }

        pop();
        
        //로그인 창
        usernameInput.show();
        passwordInput.show();

        usernameValue = usernameInput.value();
        passwordValue = passwordInput.value();

        /*
              //clickover
              if (l_xl < mouseX && mouseX < l_xh && l_yl < mouseY && mouseY < l_yh){
                push();
                drawGlow(width/2,height/2+300,30);
                pop();
              }
                */

        /*fill(0);
        rectMode(CENTER);
        rect(width/2,height/2+300,200,100);
        fill(255);
        textAlign(CENTER);
        text("enter",width/2,height/2+310);
        */

        break;

      case 4: push();
        
        imageMode(CENTER);

        pop();

        usernameInput.show();
        passwordInput.show();

        usernameValue = usernameInput.value();
        passwordValue = passwordInput.value();

        

        break;

      case 5:
        inDialogue = true;
        usernameInput.hide();
        passwordInput.hide();
        console.log("username:", usernameValue);
        //cyworld_main
        imageMode(CORNER);
        image(img_main1, 0, 0, 1920, 1080);

        break;

      case 6: //clickover
        imageMode(CORNER);
        image(img_main1, 0, 0, 1920, 1080);
        if (p_xl < mouseX && mouseX < p_xh && p_yl < mouseY && mouseY < p_yh) {
          push();
          drawGlow(492, 365, 70);
          pop();
        }

        //profile 누르기
        image(defaultpfp, 360, 280, 265, 170);
        break;

      case 7:
        inDialogue = true;
        //pfp 고르기
        image(img_main2, 0, 0, 1920, 1080);
        fill(0);
        textAlign(LEFT);
        textSize(25);
        textFont(dosGothic);
        text(" 원하는 프로필을 눌러주세요.", 720, 260);

        //clickover1
        if (p1_xl < mouseX && mouseX < p1_xh && p1_yl < mouseY && mouseY < p1_yh) {
          push();
          drawGlow(750 + 180, 350 + 180, 70);
          pop();
          girl();
        }
        //clickover2
        if (p2_xl < mouseX && mouseX < p2_xh && p2_yl < mouseY && mouseY < p2_yh) {
          push();
          drawGlow(1110 + 180, 350 + 180, 70);
          pop();
          boy();
        }


        if (frameCount % 1 == 0) image(pfps1[current++ % 15], 750, 350);
        if (frameCount % 1 == 0) image(pfps2[current++ % 15], 1110, 370);
        textAlign(CENTER);
        textSize(40);
        textFont(dosGothic);
        text("girl", 930, 770);
        text("boy", 1290, 770);


        break;

      case 8://pfp 고르기
        image(img_main2, 0, 0, 1920, 1080);
        fill(0);
        textAlign(LEFT);
        textSize(25);
        textFont(dosGothic);
        text(" 원하는 프로필을 눌러주세요.", 720, 260);

        //clickover1
        if (p1_xl < mouseX && mouseX < p1_xh && p1_yl < mouseY && mouseY < p1_yh) {
          push();
          drawGlow(750 + 180, 350 + 180, 70);
          pop();
          girl();
        }
        //clickover2
        if (p2_xl < mouseX && mouseX < p2_xh && p2_yl < mouseY && mouseY < p2_yh) {
          push();
          drawGlow(1110 + 180, 350 + 180, 70);
          pop();
          boy();
        }


        if (frameCount % 1 == 0) image(pfps1[current++ % 15], 750, 350);
        if (frameCount % 1 == 0) image(pfps2[current++ % 15], 1110, 370);
        textAlign(CENTER);
        textSize(40);
        textFont(dosGothic);
        text("girl", 930, 770);
        text("boy", 1290, 770);


        break;

      case 9:
        inDialogue = true;
        image(img_main9, 0, 0, 1920, 1080);

        textFont(dosGothic);
        textSize(15);
        text("여긴 어디..?", 1068, 465);


        if (bg_a == true) {
          girl()
        }

        if (bg_b == true) {
          boy()
        }
        break;

        case 10:
           //촬영 설명화면
     
        
      if (bg_a == true) {
        girl()
        image(instructor, 0, 0, 1920, 1080);
      }

      if (bg_b == true) {
        boy()
         image(instructor, 0, 0, 1920, 1080);
      }
      break;

    case 11:
      //촬영-인소
      image(img_main3, 0, 0, 1920, 1080);
      saveButton.show();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }

      cam.loadPixels();
      let camPixels = cam.pixels;

      let startX = 750;
      let startY = 250;
      let endX = 1390;
      let endY = 730;

      push();
      textFont('dosGothic');
      textSize(20);
      text("준비가 되었으면 촬영버튼을 누르세요! \n3초후 촬영이 시작됩니다!", 750, 860);
      pop();

      // Pixel manipulation
      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          let camX = x - 750;
          let camY = y - 250;

          if (camX >= 0 && camX < cam.width && camY >= 0 && camY < cam.height) {
            let index = (camY * cam.width + camX) * 4;
            let r = camPixels[index];
            let g = camPixels[index + 1];
            let b = camPixels[index + 2];

            // Reduce red tint
            r = constrain(r * 0.9, 0, 255);

            // Increase brightness
            r = constrain(r * 1.2, 0, 255);
            g = constrain(g * 1.2, 0, 255);
            b = constrain(b * 1.2, 0, 255);

            // Adjust saturation
            let maxColor = max(r, g, b);
            if (maxColor > 0) {
              let factor = 0.5;
              r = constrain(r + (r - maxColor) * factor, 0, 255);
              g = constrain(g + (g - maxColor) * factor, 0, 255);
              b = constrain(b + (b - maxColor) * factor, 0, 255);
            }

            // Increase yellow tint
            r = constrain(r + 70, 0, 255);
            g = constrain(g + 70, 0, 255);

            // Add noise
            let noiseAmount = 25;
            r = constrain(r + random(-noiseAmount, noiseAmount), 0, 255);
            g = constrain(g + random(-noiseAmount, noiseAmount), 0, 255);
            b = constrain(b + random(-noiseAmount, noiseAmount), 0, 255);

            camPixels[index] = r;
            camPixels[index + 1] = g;
            camPixels[index + 2] = b;
          }
        }

      }
      cam.updatePixels();

      push();
      translate(750 + cam.width, 250); // Position the webcam feed
      scale(-1, 1); // Mirror the webcam feed
      image(cam, 0, 0, cam.width, cam.height);
      pop();

      let img = random(gamsung);
      image(img, 750, 250, cam.width, cam.height);


      break;

    case 12:
      if (randomScrap1 < 202) {
        let increment = int(random(18));
        randomScrap1 += increment;
      }

      randomScrap1 = min(randomScrap1, 201);

      if (randomToday1 < 502) {
        let increment = int(random(40));
        randomToday1 += increment;
      }

      randomToday1 = min(randomToday1, 501);

      if (randomTotal1 < 502) {
        let increment = int(random(40));
        randomTotal1 += increment;
      }

      randomTotal1 = min(randomTotal1, 501);

      //인소게시판
      image(img_main11, 0, 0, 1920, 1080);
      saveButton.hide();

      push();
      textAlign(CENTER);
      textSize(18);
      textFont(dosGothic);
      text("ㄴr는 또 눈물을 흘린ㄷr...", 1100, 249);
      pop();
      push();
      textAlign(LEFT);
      textSize(18);
      fill(0, 0, 255);
      textFont(dosGothic);
      text("와이케", 762, 293);
      fill(0);
      textSize(20);
      text(year + "." + month + "." + day + " " + hours + ":" + nf(minutes, 2), 1142, 293);
      textSize(18);
      text("스크랩:" + int(randomScrap1), 1325, 293);
      fill(255, 127, 0);
      text(int(randomToday1), 407, 171);
      fill(0);
      text(int(randomTotal1), 504, 171);
      pop();

      if (randomScrap1 >= 201) {
          inDialogue = true;
        }
      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      displayLastPhoto();
      break;

    case 13:
      //홈

      inDialogue = true;
      image(img_main10, 0, 0, 1920, 1080);
        
      push();
      textSize(20);
      fill(0);
      text("[갤러리] ㄴr는 또 눈물을 흘린ㄷr...", 752, 748);
      text("다이어리 0/0", 1125, 748);
      text("게시판 0/0", 1300, 748);
      text("사진첩 1/1", 1125, 775);
      text("방명록 0/0", 1300, 775);
      fill(255, 127, 0);
      text('501', 407, 171);
      fill(0);
      text('501', 504, 171);
      textSize(15);
      text("안녕 ~ ", 1028, 465);
      pop();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      break;

    case 14:
      //애니콜

      image(img_main4, 0, 0, 1920, 1080);
      saveButton.show();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }

      push();
      textFont('dosGothic');
      textSize(20);
      text("준비가 되었으면 촬영버튼을 누르세요!\n3초후 촬영이 시작됩니다!", 750, 860);
      pop();

      /*image(bgImage, 750, 250, cam.width, cam.height);
  
        let bgImg = createImage(cam.width, cam.height);
  
      if (segmentationData.length > 0) {
      cam.loadPixels();
  
      let bgImg = createImage(cam.width, cam.height);
      bgImg.loadPixels();
  
  
  
      for (let y = 0; y < cam.height; y++) {
        for (let x = 0; x < cam.width; x++) {
          let index = (x + y * cam.width) * 4;
  
          // get segDataIdx
          let segIndex = segmentationData[index];
  
          if (segIndex != 24) { // body part
            bgImg.pixels[index + 0] = cam.pixels[index + 0];
            bgImg.pixels[index + 1] = cam.pixels[index + 1];
            bgImg.pixels[index + 2] = cam.pixels[index + 2];
            bgImg.pixels[index + 3] = cam.pixels[index + 3];
          } else {
            bgImg.pixels[index + 3] = 0; // 투명하게 처리
          }
        }
      }*/


      if (cam) image(cam, 750, 250);
      image(bgImage, 750, 250, cam.width, cam.height);


      if (segmentationData.length > 0) {
        cam.loadPixels();

        let bgImg = createImage(cam.width, cam.height);
        bgImg.loadPixels();

        for (let y = 0; y < cam.height; y++) {
          for (let x = 0; x < cam.width; x++) {
            let index = (x + y * cam.width) * 4;

            // get segDataIdx
            let segIndex = segmentationData[index];

            if (segIndex != 24) { // body part
              bgImg.pixels[index + 0] = cam.pixels[index + 0];
              bgImg.pixels[index + 1] = cam.pixels[index + 1];
              bgImg.pixels[index + 2] = cam.pixels[index + 2];
              bgImg.pixels[index + 3] = cam.pixels[index + 3];
            } else {
              bgImg.pixels[index + 3] = 0; // 투명하게 처리
            }
          }
        }

        bgImg.updatePixels();
        push(); // 현재 변형 상태를 저장
        scale(-1, 1); // 비디오를 좌우반전시킵니다.
        image(bgImg, -width + 525, 250); // 좌우반전된 비디오를 그립니다.
        image(anycall, -width + 569, 290);
        pop(); // 이전 변형 상태를 복원합니다.


      }



      break;

    case 15:
      //애니콜게시
      if (randomScrap2 < 801) {
        let increment = int(random(80, 90));
        randomScrap2 += increment;
      }

      randomScrap2 = min(randomScrap2, 801);

      if (randomToday2 < 1001) {
        let increment = int(random(60, 120));
        randomToday2 += increment;
      }

      randomToday2 = min(randomToday2, 1001);

      if (randomTotal2 < 2001) {
        let increment = int(random(100, 120));
        randomTotal2 += increment;
      }

      randomTotal2 = min(randomTotal2, 1001);
      image(img_main12, 0, 0, 1920, 1080);

  

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      saveButton.hide();
      displayLastPhoto();
      push();
      textAlign(CENTER);
      textSize(18);
      textFont(dosGothic);
      text("0HLI콜...*", 1100, 249);
      pop();
      push();
      textAlign(LEFT);
      textSize(18);
      fill(0, 0, 255);
      textFont(dosGothic);
      text("와이케", 762, 293);
      fill(0);
      textSize(20);
      text(year + "." + month + "." + day + " " + hours + ":" + nf(minutes, 2), 1142, 293);
      textSize(18);
      text("스크랩:" + int(randomScrap2), 1325, 293);
      fill(255, 127, 0);
      text(int(randomToday2), 407, 171);
      fill(0);
      text(int(randomTotal2), 504, 171);
      if (randomScrap2 >= 801) {
          inDialogue = true;
      }
   

      pop();
      break;

    case 16:
      //홈
      inDialogue = true;

      image(img_main14, 0, 0, 1920, 1080);
      push();
      textSize(20);
      fill(0);
      text("[갤러리] ㄴr는 또 눈물을 흘린ㄷr...", 752, 748);
      text("[갤러리] 0HLI콜...*", 752, 775);
      text("다이어리 0/0", 1125, 748);
      text("게시판 0/0", 1300, 748);
      text("사진첩 1/2", 1125, 775);
      text("방명록 0/0", 1300, 775);
      fill(255, 127, 0);
      text('1001', 407, 171);
      fill(0);
      text('1001', 504, 171);
      textSize(15);
      text("도토리 줄래? ", 1028, 465);
      pop();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      break;

    case 17:
      //얼짱포즈
      image(img_main5, 0, 0, 1920, 1080);
      saveButton.show();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      push();
      textFont('dosGothic');
      textSize(20);
      text("준비가 되었으면 촬영버튼을 누르세요!\n3초후 촬영이 시작됩니다!", 750, 860);
      pop();

      if (cam) image(cam, 750, 250);
      image(canmore, 750, 250, cam.width, cam.height);


      if (segmentationData.length > 0) {
        cam.loadPixels();

        let canmore = createImage(cam.width, cam.height);
        canmore.loadPixels();

        for (let y = 0; y < cam.height; y++) {
          for (let x = 0; x < cam.width; x++) {
            let index = (x + y * cam.width) * 4;

            // get segDataIdx
            let segIndex = segmentationData[index];

            if (segIndex != 24) { // body part
              canmore.pixels[index + 0] = cam.pixels[index + 0];
              canmore.pixels[index + 1] = cam.pixels[index + 1];
              canmore.pixels[index + 2] = cam.pixels[index + 2];
              canmore.pixels[index + 3] = cam.pixels[index + 3];
            } else {
              canmore.pixels[index + 3] = 0; // 투명하게 처리
            }
          }
        }

        canmore.updatePixels();
        push(); // 현재 변형 상태를 저장
        scale(-1, 1); // 비디오를 좌우반전시킵니다.
        image(canmore, -width + 525, 250); // 좌우반전된 비디오를 그립니다.
        image(hand, -width + 569, 250)
        pop(); // 이전 변형 상태를 복원합니다.

      }
      break;

    case 18:
      //얼짱포즈게시
      if (randomScrap3 < 2001) {
        let increment = int(random(100, 200));
        randomScrap3 += increment;
      }

      randomScrap3 = min(randomScrap3, 2001);

      /* if (randomToday3 < 12001) {
         let increment = int(random(400,500)); 
         randomToday3 += increment;
       }
     
       randomToday3 = min(randomToday3, 12001);
   */
      if (randomTotal3 < 20001) {
        let increment = int(random(700, 1000));
        randomTotal3 += increment;
      }

      randomTotal3 = min(randomTotal3, 20001);
      image(img_main13, 0, 0, 1920, 1080);

  
      saveButton.hide();
      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      displayLastPhoto();
      push();
      textAlign(CENTER);
      textSize(18);
      textFont(dosGothic);
      text("BF들과 캔모아에서><", 1100, 249);
      pop();
      push();
      textAlign(LEFT);
      textSize(18);
      fill(0, 0, 255);
      textFont(dosGothic);
      text("와이케", 762, 293);
      fill(0);
      textSize(20);
      text(year + "." + month + "." + day + " " + hours + ":" + nf(minutes, 2), 1142, 293);
      textSize(18);
      text("스크랩:" + int(randomScrap3), 1325, 293);
      fill(255, 127, 0);
      //text(int(randomToday3),407,171);
      fill(0);
      text(int(randomTotal3), 504, 171);


      pop();
        if (randomScrap3 >= 2001) {
          inDialogue = true;
        }

     
      break;

    case 19:
      //홈
      inDialogue = true;
      image(img_main15, 0, 0, 1920, 1080);

      push();
      textSize(20);
      fill(0);
      text("[갤러리] ㄴr는 또 눈물을 흘린ㄷr...", 752, 748);
      text("[갤러리] 0HLI콜...*", 752, 775);
      text("[갤러리] BF들과 캔모아에서><", 752, 802);
      text("다이어리 0/0", 1125, 748);
      text("게시판 0/0", 1300, 748);
      text("사진첩 1/3", 1125, 775);
      text("방명록 11/103", 1300, 775);
      fill(255, 127, 0);
      textSize(15);
      text('20001', 407, 171);
      fill(0);
      text('20001', 504, 171);
      pop();
   
      
      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      break;



    case 20:
      //하두리
      image(img_main6, 0, 0, 1920, 1080);
      saveButton.show();

      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      push();
      textFont('dosGothic');
      textSize(20);
      text("준비가 되었으면 촬영버튼을 누르세요!\n3초후 촬영이 시작됩니다!", 750, 860);
      pop();
      cam.loadPixels();
      let camPixels1 = cam.pixels;

      let startX1 = 750;
      let startY1 = 250;
      let endX1 = 1390;
      let endY1 = 730;

      // Apply brightness, saturation, and noise adjustments to the specified region
      for (let y = startY1; y < endY1; y++) {
        for (let x = startX1; x < endX1; x++) {
          let camX = x - 750;
          let camY = y - 250;

          if (camX >= 0 && camX < cam.width && camY >= 0 && camY < cam.height) {
            let index = (camY * cam.width + camX) * 4;
            let r = camPixels1[index];
            let g = camPixels1[index + 1];
            let b = camPixels1[index + 2];

            // Reduce red
            r = constrain(r * 0.8, 0, 255);

            // Reduce yellow (green channel)
            g = constrain(g * 0.9, 0, 255);

            // Increase brightness
            r = constrain(r * 1.6, 0, 255);
            g = constrain(g * 1.6, 0, 255);
            b = constrain(b * 1.6, 0, 255);

            // Adjust saturation
            let maxColor = max(r, g, b);
            if (maxColor > 0) {
              let factor = 0.3;
              r = constrain(r + (r - maxColor) * factor, 0, 255);
              g = constrain(g + (g - maxColor) * factor, 0, 255);
              b = constrain(b + (b - maxColor) * factor, 0, 255);
            }

            // Add noise
            let noiseAmount = 25;
            r = constrain(r + random(-noiseAmount, noiseAmount), 0, 255);
            g = constrain(g + random(-noiseAmount, noiseAmount), 0, 255);
            b = constrain(b + random(-noiseAmount, noiseAmount), 0, 255);

            camPixels1[index] = r;
            camPixels1[index + 1] = g;
            camPixels1[index + 2] = b;
          }
        }
      }

      cam.updatePixels();

      push();
      translate(750 + cam.width, 250); // Position the webcam feed
      scale(-1, 1); // Mirror the webcam feed
      image(cam, 0, 0, cam.width, cam.height);
      pop();

      image(haduri, 750, 250, haduri.width, haduri.height);
      break;

    case 21:
      //하두리게시
      if (randomScrap4 < 4001) {
        let increment = int(random(500, 600));
        randomScrap4 += increment; 
      }

      randomScrap4 = min(randomScrap4, 4001);

      if (randomToday4 < 20001) {
        let increment = int(random(1000, 1400));
        randomToday4 += increment;
      }

      randomToday4 = min(randomToday4, 20001);

      if (randomTotal4 < 100000) {
        let increment = int(random(10000, 13000));
        randomTotal4 += increment;
      }

      randomTotal4 = min(randomTotal4, 100000);
      image(img_main8, 0, 0, 1920, 1080);

      
      saveButton.hide();
      if (bg_a == true) {
        girl()
      }

      if (bg_b == true) {
        boy()
      }
      displayLastPhoto();
      push();
      textAlign(CENTER);
      textSize(18);
      textFont(dosGothic);
      text("music is my life", 1100, 249);
      pop();

     
      push();
      textAlign(LEFT);
      textSize(18);
      fill(0, 0, 255);
      textFont(dosGothic);
      text("와이케", 762, 293);
      fill(0);
      textSize(20);
      text(year + "." + month + "." + day + " " + hours + ":" + nf(minutes, 2), 1142, 293);
      textSize(18);
      text("스크랩:" + int(randomScrap4), 1325, 293);
      fill(255, 127, 0);
      text(int(randomToday4), 407, 171);
      fill(0);
      text(int(randomTotal4), 504, 171);


      pop();
        if (randomScrap4 >= 4001) {
          inDialogue = true;
        }

      break;


    case 22:
      image(deco1, 0, 0, 1920, 1080);
      nextButton.show();

      if (photoCount === maxPhotos) {
        let photoWidth = 410; // 줄인 사진의 너비
        let photoHeight = 307.5; // 줄인 사진의 높이
        let startX = 540; // 시작 X 좌표
        let startY = 210; // 시작 Y 좌표, 캔버스의 중앙에 위치

        // Display the 4 photos in a 2x2 grid on the canvas
        for (let i = 0; i < photos.length; i++) {
          let x = (i % 2) * photoWidth + startX;
          let y = Math.floor(i / 2) * photoHeight + startY;
          push();
          translate(x + photoWidth / 2, y + photoHeight / 2);
          image(photos[i], -photoWidth / 2, -photoHeight / 2, photoWidth, photoHeight); // Display the photo
          pop();
        }
      }

      //스티커 꾸미기
      for (let i = 0; i < stickerObjects.length; i++) {
        let sticker = stickerObjects[i];
        push();
        translate(sticker.x, sticker.y);
        rotate(sticker.angle);
        imageMode(CENTER);
        image(sticker.img, 0, 0, sticker.width, sticker.height);
        pop();
      }

      if (savedPhoto) {
        image(savedPhoto, 540, 210, savedPhoto.width, savedPhoto.height);
      }
      break;


    case 23:
      image(deco2, 0, 0, 1920, 1080);

      if (savedPhoto) {
        image(savedPhoto, 540, 210, savedPhoto.width, savedPhoto.height);
      }

      push();
      if (changeFrameRate == true) {
        frameRate(60);
      }

      changeFrameRate = true;
      //펜 그리기
      lightPinkButton.show();
      lightBlueButton.show();
      lightGreenButton.show();
      lavenderButton.show();
      blackButton.show();
      undoButton.show();
      nextButton.show();
      clearButton.show();

      // 사용자가 그린 그림 표시
      for (let path of drawing) {
        beginShape();
        for (let i = 0; i < path.length; i++) {
          let { x, y, color, weight } = path[i];
          stroke(color);
          strokeWeight(weight);
          noFill();
          vertex(x, y);
        }
        endShape();
      }
      if (mouseIsPressed) {
        let point = {
          x: mouseX,
          y: mouseY,
          color: brushColor,
          weight: 4
        };
        currentPath.push(point);
      }
      console.log("Drawing:", drawing);
      console.log("Current Path:", currentPath);
      console.log("Brush Color:", brushColor);
      console.log("Mouse Is Pressed:", mouseIsPressed);
      noStroke();
      pop();
      break;

    case 24:
      changeFrameRate = false;
      image(deco3, 0, 0, 1920, 1080);
      //image(finalButton, 1465, 758);
      //final pic

      lightPinkButton.hide();
      lightBlueButton.hide();
      lightGreenButton.hide();
      lavenderButton.hide();
      blackButton.hide();
      clearButton.hide();
      undoButton.hide();
      nextButton.hide();
      //nextButton.show();

      if (savedPhoto) {
        image(savedPhoto, 540, 210, savedPhoto.width, savedPhoto.height);
      }

      break;



    case 25:
      background(255);
      image(deco4, 0, 0, 1920, 1080);
      //qr code 만들기
      //임시로 finalqr지정 * 최종적으로는 큐알코드 '링크' 올려야 함 *
      // finalqr = loadImage('assets/qr.png');

      shutdownButton.show();

      //영수증
      rectMode(CORNER);
      fill(255);
      rect(470, 167, 276, 759);

      //영수증 template
      push();
      fill(0);
      textFont(dosGothic);
      textAlign(CENTER);
      textSize(35);
      text("back to y2k", 614, 200);

      textSize(10);
      text("2024.06.20 - 21.", 614, 215);
      textSize(8);
      text("서울대학교 64동 IBK커뮤니케이션센터", 614, 225);

      /*textSize(10);
      text("Your ID:" + usernameValue, 614, 265);
      text("Your PW:" + passwordValue, 614, 275);*/

      textSize(12);
      text(".*☆。..。.☆*。。ㅇ.☆.。*..*☆。..。.☆*。。ㅇ.", 614, 265);
      text("ㄷr시 만ㄴr서 반ㄱr워!", 614, 280);
      text("함께 떠난 추억여행... 즐거웠지?", 614, 295);
      text(".*☆。..。.☆*。。ㅇ.☆.。*..*☆。..。.☆*。。ㅇ.", 614, 310);

      imageMode(CORNER);
      image(minime, 605, 350, minime.width / 2, minime.height / 2);
      image(bubble, 633, 315, 110, 80);
      textSize(10);
      text("ㄴr를 스캔ㅎH줘!", 690, 354);
      image(qr_test, 490, 320, 150, 150);
      textSize(8);
      text("QR코드를 스캔하면 사진을 다운 받을 수 있습니다.", 614, 475);

      fill(225);
      textSize(10);
      text("---------------------------------------------------", 614, 500);
      fill(0);

      //your miniroom
      textAlign(LEFT);
      textFont(dosGothic);
      textSize(12);
      text("YOUR MINI ROOM", 500, 525);

      if (bg_a == true) {
        imageMode(CENTER);
        image(mini1, 614, 600, 235, 125);
      }

      if (bg_b == true) {
        imageMode(CENTER);
        image(mini2, 614, 600, 235, 125);
      }

      //brought to you by
      textAlign(LEFT);
      textFont(dosGothic);
      textSize(12);
      text("BROUGHT TO YOU BY", 500, 700);
      textSize(10);
      text("팀장....................................홍지민", 500, 730);
      text("개발....................................심은비", 500, 750);
      text("개발....................................김지희", 500, 770);
      text("디자인..................................강지은", 500, 790);
      text("디자인..................................윤정우", 500, 810);

      //barcode
      textFont(barcodeF);
      textAlign(CENTER);
      textSize(50);
      text("+isc technology+", 614, 900);
      pop();
      break;



    case 26:
      //qr scan
      image(deco5, 0, 0, 1920, 1080);
      nextButton.hide();

      shutdownButton.show();

      let qrImage = createImg(finalQrCodeBase64, 'QR Code');
      qrImage.position(1180,200);
      qrImage.size(200,200);

      // push();
      // rectMode(CENTER);
      // fill(255);
      // rect(1262, 306, 210, 210);
      // imageMode(CENTER);
      // image(finalqr, 1262, 306, 210, 210);
      // pop();
      break;

      case 27:
        showLogoutImg = true;
        redraw();
        setTimeout(() => {
          location.reload();
        }, 2000); // 3초 후에 실행
        break;

    }


  }

}

function camReady() {
  console.log("Webcam Ready!");
  loadBodySegmentationModel();
}




async function loadBodySegmentationModel() {
  const model = bodySegmentation.SupportedModels.BodyPix;
  const segmenterConfig = {
    architecture: "ResNet50",
    outputStride: 32,
    quantBytes: 2,
  };
  segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  console.log("Model Loaded!");

  // initiate the segmentation
  getSegmentation();
}

async function getSegmentation() {
  const segmentationConfig = {
    multiSegmentation: true,
    segmentBodyParts: true,
  };
  const segmentation = await segmenter.segmentPeople(
    cam.elt,
    segmentationConfig
  );

  if (segmentation.length > 0) {
    let result = await segmentation[0].mask.toImageData();
    segmentationData = result.data;
  }
  getSegmentation();

  // repeat the segmentation
 /* if(stage == 11 || stage === 12 || stage === 14){  
    getSegmentation();
  }*/
 
}


function girl() {
  image(pfp1, 360, 280, 265, 170);
  fill(0);
  textAlign(LEFT);
  textSize(25);
  textFont(dosGothic);
  text(">음악듣는소녀<", 360, 490);
  textSize(20);
  text('muzik lover', 470, 248);
  text("난 ㅈ1금 미쳐ㄱr고 있ㄷr...", 360, 540);
  text("이 노ㄹH에 내 모든 몸과", 360, 570);
  text("영혼을 맡겼ㄷr...", 360, 600);
}

function boy() {
  image(pfp2, 360, 280, 265, 170);
  fill(0);
  textAlign(LEFT);
  textSize(25);
  textFont(dosGothic);
  text(">불꽃놀이소년<", 360, 490);
  textSize(20);
  text('fire boy', 470, 248);
  text("since 02.04.08.", 360, 540);
  text("끝ㄴrㅈ1 않는 우ㄹ1 불꽃놀01", 360, 570);
  text("love...", 360, 600);

}
async function mouseClicked() {
  console.log(stage)
  let mx = mouseX;
  let my = mouseY;
 if (inDialogue) {
    dialogueIndex++;
    if (dialogueIndex >= dialogues[stage].length) {
      inDialogue = false;
      dialogueIndex = 0;
      stage++;
    }
  } else {
 if(stage == 0) {
  if (0 <= mx && mx <= width && 0 <= my && my <= height) {
    stage = 1; 
  }
 }

 if (stage == 6) {
      if (p_xl < mx && mx < p_xh && p_yl < my && my < p_yh) {
        stage = 7;
      }
    }

    if (stage == 8) {
      if (p1_xl < mx && mx < p1_xh && p1_yl < my && my < p1_yh) {
        stage = 9;
        bg_a = true;
      }
      if (p2_xl < mx && mx < p2_xh && p2_yl < my && my < p2_yh) {
        stage = 9;
        bg_b = true;
      }

    }
 else if (stage == 9) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 10; //photo 1
      }
    }
    else if (stage == 10) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 11; //photo 1
      }
    }
   
    else if (stage == 13) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 14; //photo 2
        getSegmentation()
      }
    }
    
    else if (stage == 16) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 17; //photo3
        getSegmentation()
      }
    }
   
    else if (stage == 19) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 20; //photo4
      }
    }
    else if (stage == 21) {
      if (0 <= mx && mx <= width && 0 <= my && my <= height) {
        stage = 22; //photo4
      }
    }
 

  else if (stage == 24) {
    if (mx >= f1_x1 && mx <= f1_x2 && my >= f1_y1 && my <= f1_y2){
      console.log('24 next')
      let currentFrameImage = get(540, 210, 820, 615);
      let base64Image = currentFrameImage.canvas.toDataURL();
      // supbase64Image = base64Image;
      // queueImageUpload(supbase64Image);
      await uploadImageToSupabase(base64Image);
      stage = 25;
    }
  }


  else if (stage == 25) {
    if (q1_xl < mx && mx < q1_xh && q1_yl < my && my < q1_yh) {
      printCanvas();
    }
    if (q2_xl < mx && mx < q2_xh && q2_yl < my && my < q2_yh) {
      stage = 26;
    }
  }
}
}

function mouseMoved() {
  document.body.style.cursor = 'default';

  // 프로필 클릭
  if (stage == 6) {
    if (p_xl < mouseX && mouseX < p_xh && p_yl < mouseY && mouseY < p_yh) {
      document.body.style.cursor = 'pointer';
    }
  }

  // 캐릭터 고르기
  if (stage == 8) {
    if ((p1_xl < mouseX && mouseX < p1_xh && p1_yl < mouseY && mouseY < p1_yh) ||
        (p2_xl < mouseX && mouseX < p2_xh && p2_yl < mouseY && mouseY < p2_yh)) {
      document.body.style.cursor = 'pointer';
    }
  }
/*
  if (stage === 4 || stage === 5 || stage === 7 || stage === 8 || 
    stage === 10 || stage === 11 || stage === 13 || stage === 14 || 
    stage === 16) {
  if (n1_xl < mouseX && mouseX < n1_xl + 140 && n1_yl < mouseY && mouseY < n1_yl + 50) {
    document.body.style.cursor = 'pointer';
  }
}
*/
  // final 사진 확인
  if (stage == 24) {
    if (mouseX >= f1_x1 && mouseX <= f1_x2 && mouseY >= f1_y1 && mouseY <= f1_y2) {
      document.body.style.cursor = 'pointer';
    }
  }

  // 영수증 프린트
  if (stage == 25) {
    if ((q1_xl < mouseX && mouseX < q1_xh && q1_yl < mouseY && mouseY < q1_yh) ||
        (q2_xl < mouseX && mouseX < q2_xh && q2_yl < mouseY && mouseY < q2_yh)) {
      sdocument.body.style.cursor = 'pointer';
    }
  }
}


function drawGlow(x, y, r) {
  noFill();
  stroke(255, 255, 0, 100);
  strokeWeight(200);
  ellipse(x, y, r + 40, r + 40);
  stroke(255, 255, 0, 60);
  ellipse(x, y, r + 80, r + 80);
  stroke(255, 255, 0, 30);
  ellipse(x, y, r + 120, r + 120);
}

function savePicture() {
  let snapshot = get(750, 250, cam.width, cam.height);
  photos.push(snapshot);
  stage++;
  photoCount++;
}

function nextStage() {
  savedPhoto = get(540, 210, 820, 615);
  stage++;
  nextButton.hide();
}

// function printCanvas() {
//   let newSrc = finalqr;  // Replace with your desired QR code image URL

//   fetch('assets/print.html')
//     .then(response => response.text())
//     .then(data => {
//       // Modify the QR code image source in the fetched HTML
//       let updatedHTML = data.replace(/src="[^"]*"/, `src="${newSrc}"`);

//       const printWindow = window.open('', '_blank', 'width=800,height=600');
//       printWindow.document.write(`
//         <html>
//         <head>
//           <title>Print</title>
//           <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css" rel="stylesheet">
//           <style>
//             @font-face {
//               font-family: 'DOSGothic';
//               src: url('./assets/DOSGothic.ttf');
//               font-weight: normal;
//               font-style: normal;
//             }
//             @font-face {
//               font-family: 'Barcode';
//               src: url('./assets/barcode.ttf');
//               font-weight: normal;
//               font-style: normal;
//             }
//             .title { font-size: 40px; font-family: 'DOSGothic'; text-align: center; }
//             .regular { font-family: 'NanumSquare'; font-size: 10px; text-align: center; }
//             .smaller { font-family: 'DOSGothic'; font-size: 12px; text-align: center; line-height: 2; }
//             .bigger { font-family: 'NanumSquare'; font-size: 12px; text-align: center; line-height: 1.5; }
//             .subtitle { font-family: 'DOSGothic'; font-size: 15px; text-align: center; }
//             .ending { font-family: 'Barcode'; font-size: 60px; text-align: center; }
//             .center { display: flex; justify-content: center; align-items: flex-end; }
//             .speech-container { position: relative; display: inline-block; }
//             .speech-container img { display: block; }
//             .speech-text { position: absolute; top: 0; left: 0; width: 100%; text-align: center; }
//           </style>
//         </head>
//         <body>
//           ${updatedHTML}
//         </body>
//         </html>
//       `);
//       printWindow.document.close();

//       // Wait for the content to be fully loaded before printing
//       printWindow.onload = function () {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     })
//     .catch(error => console.error('Error fetching the print.html file:', error));
// }

function printCanvas() {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <html>
        <head>
          <title>Print</title>
          <link href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css" rel="stylesheet">
          <style>
            @font-face {
              font-family: 'DOSGothic';
              src: url('./assets/DOSGothic.ttf');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'Barcode';
              src: url('./assets/barcode.ttf');
              font-weight: normal;
              font-style: normal;
            }
            .title { font-size: 40px; font-family: 'DOSGothic'; text-align: center; }
            .regular { font-family: 'NanumSquare'; font-size: 10px; text-align: center; }
            .smaller { font-family: 'DOSGothic'; font-size: 12px; text-align: center; line-height: 2; }
            .bigger { font-family: 'NanumSquare'; font-size: 12px; text-align: center; line-height: 1.5; }
            .subtitle { font-family: 'DOSGothic'; font-size: 15px; text-align: center; }
            .ending { font-family: 'Barcode'; font-size: 60px; text-align: center; }
            .center { display: flex; justify-content: center; align-items: flex-end; }
            .speech-container { position: relative; display: inline-block; }
            .speech-container img { display: block; }
            .speech-text { position: absolute; top: 0; left: 0; width: 100%; text-align: center; }
            .qr-container { position: relative; display: inline-block; }
            .qr-container img { display: block; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class = dimension-container>
                <div class = title>
                back to y2k
            </div>
            <div class = bigger>
                2024.06.20 - 21.<br>
            </div>
            <div class = regular>
                서울대학교 64동 IBK커뮤니케이션센터<br>
                <br>
                <br>
            <div class= bigger>
                Your ID: ${usernameValue}<br>
                Your PW: ${passwordValue}
                <br>
                <br>
            </div>
            <div class = bigger>
                .*☆。.。.☆*。。ㅇ.☆.。*..*☆。.。.☆*。ㅇ.<br>
                ㄷг시 만ㄴг서 반ㄱг워!<br>
                ㅎ古께 떠난 추억øㅕ행... 즐つㅓ웠ズl?<br>
                .*☆。.。.☆*。。ㅇ.☆.。*..*☆。.。.☆*。ㅇ.<br>
                <br>
                <br>
                <br>

                ──┼────ミ♣ミ─────┼── <br>

                친구ㄱг무엇을뜻ㅎг는줄○гㄴı¿ <br>

                금ㅂБㅆг워놓고‥ <br>

                서로후호ıㅎг고口ı안ㅎН하는게친구ㅇF‥ <br>

                서로두ı에서남모르게ㅈı켜주고‥ <br>

                ㄴг를위ㅎН목숨도ㅂг춰줄수있는게‥ <br>

                ㅂг로친구ㅇF‥ <br>

                언제ㄴг든든한버팀목○ı도ı주는게‥ <br>

                진정한친구ㅇF‥ <br>

                ──┼────ミ♣ミ─────┼──
            </div>
            <br>
            <br>
            <br>
            <div class = center >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img id="qrCodeImage" src="${finalQrCodeBase64}" alt="qr code" width="150" height="150">
                <div class="speech-container">
                    <img src="./assets/minime.png" alt="minime for scanning" width="180" height="150">
                    <div class="speech-text">ㄴг를 스캔ㅎH줘!</div> <!-- Add your text here -->
                </div>
            </div>
                <br>
            <div class = regular>
                QR코드를 스캔하면 사진을 다운 받을 수 있습니다.
            </div>
            <br>
            <br>
            <div class = subtitle>
                BROUGHT TO YOU BY
            </div>
            <br>
            <div class = smaller>
                팀장................................홍지민<br>
                개발................................심은비<br>
                개발................................김지희<br>
                디자인..............................강지은<br>
                디자인..............................윤정우<br>
            </div>
            <br>
            <br>
            <div class = ending>
                +isc technology+
            </div>
            <br>
            <br>
            <br>
            <br>
        </div>
        </body>
      </html>
      `);
      printWindow.document.close();
      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };
    }

//스티커 옮기기 (클릭 및 드래그)
function mousePressed() {
  for (let i = stickerObjects.length - 1; i >= 0; i--) {
    let sticker = stickerObjects[i];
    let d = dist(mouseX, mouseY, sticker.x, sticker.y);
    if (d < max(sticker.width, sticker.height) / 2) {
      selectedSticker = sticker;
      offsetX = mouseX - sticker.x;
      offsetY = mouseY - sticker.y;
      break;
    }
  }
  if (stage === 23) {
    currentPath = [];
    drawing.push(currentPath);
  }
}

function mouseDragged() {
  if (selectedSticker) {
    selectedSticker.x = mouseX - offsetX;
    selectedSticker.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  selectedSticker = null;
  if (stage === 23) {
    currentPath = [];
  }
}

//스티커 확대, 축소 (클릭한 상태에서 마우스 휠)
function mouseWheel(event) {
  if (selectedSticker) {
    let scaleAmount = event.delta > 0 ? 0.9 : 1.1;
    selectedSticker.width *= scaleAmount;
    selectedSticker.height *= scaleAmount;
  }
}

//스티커 각도 조절 (클릭한 상태에서 좌, 우 키)
function keyPressed() {
  if (selectedSticker) {
    if (keyCode === LEFT_ARROW) {
      selectedSticker.angle -= 0.1;
    } else if (keyCode === RIGHT_ARROW) {
      selectedSticker.angle += 0.1;
    }
  }

  if (keyCode === ENTER) {
    if (stage === 4) {
      stage = 5;
    }
  }
}

function captureAndSaveImage() {
  // 현재 프레임을 이미지로 캡처
  const canvasElement = document.querySelector("canvas");
  const capturedImage = canvasElement.toDataURL("image/jpeg");

  // 이미지 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = capturedImage;
  link.download = "captured_image.jpg";
  link.click();
}

function clearDrawing() {
  drawing = []; // 그리기 배열 초기화
}

function shutDown() {
  stage = 27;
  //location.reload();
  photos = [];
  passwordValue = '';
  usernameValue = '';
  photoCount = 0;
  drawing = []; // 사용자가 그린 그림을 저장할 배열
  brushColor = 'black'; // 초기 브러쉬 색은 black
  currentPath = []; //
  stickers = [];
  stickerObjects = [];
  selectedSticker = null;
  today = new Date();

  current = 0;
  startRecording = false;

  bg_a = false;
  bg_b = false;
  backButton.show();

   // 모든 p5.js DOM 요소 제거
  removeAllDomElements();


    
}

function reloadPage() {
  location.reload();
}

function backY2K() {
  stage = 3;
}

function changeButtonColor() {
  shutdownButton.style('background-color', 'rgba(255, 255, 0, 0.5)');
  backButton.style('background-color', 'rgba(255, 255, 0, 0.5)');
  saveButton.style('background-color', 'rgba(255, 255, 0, 0.5)');
}

// 마우스가 버튼에서 벗어났을 때 배경색을 초기 상태로 변경하는 함수
function resetButtonColor() {
  shutdownButton.style('background-color', 'transparent');
  backButton.style('background-color', 'transparent');
  saveButton.style('background-color', 'transparent');
}


function handleButtonClick() {
  startCountdown(); // 카운트다운 시작
  setTimeout(savePicture, 3000); // 3초 후에 savePicture 호출
}

function startCountdown() {
  saveButton.attribute('disabled', true); // 버튼 비활성화
  countdown = 4; // 초기 카운트다운 값 설정
  setTimeout(updateCountdown, 1000); // 1초마다 카운트다운 업데이트
}

function updateCountdown() {
  countdown--; // 카운트다운 값을 1초 감소

  if (countdown > 0) {
    saveButton.html('찰칵!<br>(' + countdown + ')'); // 버튼 텍스트 업데이트
    setTimeout(updateCountdown, 1000); // 1초 후에 다시 업데이트
  } else {
    saveButton.html('찰칵'); // 버튼 텍스트 초기화
    saveButton.removeAttribute('disabled'); // 버튼 활성화
  }
}
function displayLastPhoto() {
  lastPhoto = photos[photos.length - 1];
  image(lastPhoto, 792, 345);
}
