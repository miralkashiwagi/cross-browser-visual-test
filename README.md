# 準備
```
npm install
```

# 使い方1 クロスブラウザビジュアルテスト
## ページリスト作成
package.jsonのpagelistにクロスブラウザテストしたいURLを記入

```json
  "pagelist": [
    "https://example.com/",
    "https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8"
  ]
```

## スクリーンショットの取得
```
npm run cap
```

## 比較の実行
### chromium(chrome) と webkit(safari)
```
npm run test:webkit
```

出力と diff_image を確認してください。  


### chromium(chrome) と firefox
```
npm run test:firefox
```

出力と diff_image を確認してください。

# 使い方2 二つのURLの比較
TBD