// example.spec.js
const { test, expect } = require('@playwright/test');
import p from "../package.json"

const dir = "screenshots/"
var pagelist = p.pagelist;

test.use({
  viewport: { width: 1400, height: 800 },
  deviceScaleFactor: 1,
})


test.describe('multiple pages test',()=>{
  pagelist.forEach((item)=>{
    let filename =  item.replace(/(http:\/\/|https:\/\/)/g,"").replace(/\/?$/,"").replace(/\//g, "_").replace(/\./g, "-").replace(/:/g, "");
    test(`${filename} test`, async ({ page }) => {
      const browserName = page.context().browser().browserType().name()

      //URLへ移動
      await page.goto(item);

      //ページを下までスクロール
      await page.evaluate(() => window.scroll({top:document.body.scrollHeight, behavior:'smooth'}));
      await page.waitForTimeout(1000); // 1秒待機

      //ページを上までスクロール
      await page.evaluate(() => window.scroll({top: 0, behavior: 'smooth'}));
      await page.waitForTimeout(2000); // 2秒待機

      //スクリーンショットをとる
      await page.screenshot({ path:dir+ browserName+"-" + filename+".png", fullPage: true });
    });
  })
})