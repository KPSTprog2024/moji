document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const pieceCount = 4; // まずは4ピースに分割（後で選択可能にする）

  document.getElementById('uploadButton').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          // キャンバスにアップロードされた画像を表示
          const pieceWidth = image.width / Math.sqrt(pieceCount); // ピースの幅
          const pieceHeight = image.height / Math.sqrt(pieceCount); // ピースの高さ

          // 画像を表示
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          // ピースごとに画像を分割
          for (let row = 0; row < Math.sqrt(pieceCount); row++) {
            for (let col = 0; col < Math.sqrt(pieceCount); col++) {
              // 各ピースの部分を切り出す
              const pieceImage = ctx.getImageData(col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight);
              // 後でドラッグできるよう、ここにピースを描画する処理を追加
              console.log('ピース作成', pieceImage); // 確認用のログ
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  });
});
