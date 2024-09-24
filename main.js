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
  // ゲームに必要な画像やアセットをここで読み込む（今回は空）
}

function create() {
  // 「パズルを始めよう」のテキスト表示
  this.add.text(200, 300, 'パズルを始めよう！', { fontSize: '32px', fill: '#000' });

  const pieceCount = 4; // ピースの数（2x2 = 4ピース）
  const rows = Math.sqrt(pieceCount); // 行数
  const cols = Math.sqrt(pieceCount); // 列数
  const pieces = [];  // ピースを管理する配列

  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const pieceWidth = image.width / cols;  // 各ピースの幅
          const pieceHeight = image.height / rows; // 各ピースの高さ

          // ピースごとに画像を分割してランダムに配置
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const sx = col * pieceWidth; // 切り出すX座標
              const sy = row * pieceHeight; // 切り出すY座標

              // ランダムに描画位置を決定
              const dx = Phaser.Math.Between(0, 800 - pieceWidth);  // ランダムX座標
              const dy = Phaser.Math.Between(0, 600 - pieceHeight); // ランダムY座標

              // ピースを作成し、ドラッグ可能にする
              let piece = this.add.image(dx, dy, image);
              piece.setInteractive();
              this.input.setDraggable(piece);

              // ドラッグイベントの処理
              this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
              });

              pieces.push(piece);  // ピースを配列に追加して管理
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  });
}

function update() {
  // 毎フレームの更新処理（今回は不要）
}
