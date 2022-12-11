const fs = require('fs');
const resembleChromiumFirefox = require('resemblejs');
const p =require('./package.json')

const dir = "screenshots/"
var pagelist = p.pagelist;

//本文テキストの色を除外
const color = p.bodyColor;


pagelist.forEach((item) => {
    let filename = item.replace(/(http:\/\/|https:\/\/)/g, "").replace(/\/?$/, "").replace(/\//g, "_").replace(/\./g, "-");

    // 比較したい画像のパスを指定
    const image1 = fs.readFileSync("./screenshots/chromium-" + filename + ".png");
    const image2 = fs.readFileSync("./screenshots/firefox-" + filename + ".png");


    resembleChromiumFirefox(image1)
        .compareTo(image2)
        .ignoreAntialiasing()
        .outputSettings({ ignoreAreasColoredWith: color,largeImageThreshold:0 })
        .onComplete(data => {
            if (data.misMatchPercentage >= 0.5) {
                console.log(filename);
                console.log('差分を検知しました。');
                fs.writeFileSync("./diff_image/"+filename+".jpg", data.getBuffer());
            } else {
                console.log(filename);
                console.log("差分なし");
                fs.writeFileSync("./diff_image/"+filename+".jpg", data.getBuffer());
            }
        });
});

