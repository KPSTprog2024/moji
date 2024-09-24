// Phaserの基本設定
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  canvas: document.getElementById('gameCanvas'),
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // ゲームに必要な画像やアセットをここで読み込む
}

function create() {
  // ゲームが始まる準備をここで行う
  this.add.text(200, 300, 'パズルを始めよう！', { fontSize: '32px', fill: '#000' });
}

function update() {
  // 毎フレームの更新処理
}

// 画像アップロードとピース分割のロジックを統合
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const pieceCount = 4; // まずは4ピースに分割（後で選択可能にする）
  const rows = Math.sqrt(pieceCount); // 行数
  const cols = Math.sqrt(pieceCount); // 列数

  document.getElementById('uploadButton').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          // キャンバスのサイズを画像に合わせる
          canvas.width = image.width;
          canvas.height = image.height;

          const pieceWidth = image.width / cols;  // 各ピースの幅
          const pieceHeight = image.height / rows; // 各ピースの高さ

          // ピースごとに画像を分割してランダムに配置
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              // 各ピースの部分を切り出し
              const sx = col * pieceWidth; // 切り出すX座標
              const sy = row * pieceHeight; // 切り出すY座標

              // 切り出したピースをランダムな場所に描画
              const dx = Math.random() * (canvas.width - pieceWidth);
              const dy = Math.random() * (canvas.height - pieceHeight);

              // 各ピースをランダムな位置に描画
              ctx.drawImage(image, sx, sy, pieceWidth, pieceHeight, dx, dy, pieceWidth, pieceHeight);
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  });
});
