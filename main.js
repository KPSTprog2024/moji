// Phaserの基本設定
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0xff00ff,  // 背景色を紫に変更
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // 必要に応じて事前に読み込むアセット
}

function create() {
  this.add.text(200, 100, 'テスト表示！', { fontSize: '48px', fill: '#ff0000' });  // 赤い文字で「テスト表示！」
  this.add.text(200, 300, 'パズルを始めよう！', { fontSize: '32px', fill: '#000' });

  const pieceCount = 4; // ピースの数（2x2 = 4ピース）
  const rows = Math.sqrt(pieceCount);
  const cols = Math.sqrt(pieceCount);
  
  // ゲームキャンバスのサイズ
  const canvasWidth = this.sys.game.config.width;
  const canvasHeight = this.sys.game.config.height;

  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;

        // Phaser.jsに画像をテクスチャとして読み込む
        this.textures.remove('uploadedImage');  // 古い画像を削除
        this.textures.once('onload', () => {
          // 画像のアスペクト比を保持して、キャンバス内にピースを収める
          const imageWidth = this.textures.get('uploadedImage').source[0].width;
          const imageHeight = this.textures.get('uploadedImage').source[0].height;
          const aspectRatio = imageWidth / imageHeight;
          
          let pieceWidth, pieceHeight;
          if (aspectRatio >= 1) {  // 横長画像
            pieceWidth = canvasWidth / cols;
            pieceHeight = pieceWidth / aspectRatio;
          } else {  // 縦長画像
            pieceHeight = canvasHeight / rows;
            pieceWidth = pieceHeight * aspectRatio;
          }

          // ピースごとに画像を分割してランダムに配置
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const dx = Phaser.Math.Between(50, canvasWidth - pieceWidth - 50); // X座標を調整
              const dy = Phaser.Math.Between(50, canvasHeight - pieceHeight - 50); // Y座標を調整

              // ピースを作成し、ドラッグ可能にする
              let piece = this.add.image(dx, dy, 'uploadedImage').setCrop(
                col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight
              );
              piece.setInteractive();
              this.input.setDraggable(piece);

              // ピースごとにドラッグイベントを設定
              piece.on('drag', (pointer, dragX, dragY) => {
                piece.x = dragX;
                piece.y = dragY;
              });
            }
          }
        });

        this.textures.addBase64('uploadedImage', imageUrl);  // 新しい画像を読み込む
      };
      reader.readAsDataURL(file);
    }
  });
}

function update() {
  // 毎フレームの更新処理（今回は不要）
}
