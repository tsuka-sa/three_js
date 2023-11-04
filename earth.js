window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 1670;
  const height = 970;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);


  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry = new THREE.SphereGeometry(160, 30, 30);
  const texture = new THREE.TextureLoader().load("assets/earth.jpg");
  const material = new THREE.MeshPhysicalMaterial({
    map: texture 
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 背景画像を読み込む
  const loader = new THREE.TextureLoader();
  loader.load('assets/back.jpg' , function(texture) {
    const bgGeometry = new THREE.PlaneGeometry(1200, 800); // パネルを用意して
    const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial); // 画像を貼る
    bgMesh.position.set(0, 0, -500);  // 場所を背後にする
    scene.add(bgMesh);
  });

  // 平行光源
  const light = new THREE.DirectionalLight(0XFFFFFF);
  light.intensity = 10; // 光の強さを倍に
  light.position.set(1, 1, 1); // ライトの方向


  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}
