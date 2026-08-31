(function () {
  if (!window.THREE) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 700) return;
  if (document.getElementById("fx-three")) return;

  var THREE = window.THREE;
  var canvas = document.createElement("canvas");
  canvas.id = "fx-three";
  document.body.appendChild(canvas);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.z = 14;

  function hex() {
    var ph = getComputedStyle(document.documentElement).getPropertyValue("--ph").trim() || "#7cffb2";
    return ph;
  }

  var count = 420;
  var positions = new Float32Array(count * 3);
  for (var i = 0; i < count; i++) {
    var u = Math.random() * Math.PI * 2;
    var v = Math.acos(2 * Math.random() - 1);
    var r = 5.2 + Math.random() * 4.4;
    positions[i * 3] = r * Math.sin(v) * Math.cos(u);
    positions[i * 3 + 1] = r * Math.sin(v) * Math.sin(u);
    positions[i * 3 + 2] = r * Math.cos(v);
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  var pointsMat = new THREE.PointsMaterial({ size: 0.045, color: hex(), transparent: true, opacity: 0.7, depthWrite: false });
  var cloud = new THREE.Points(geo, pointsMat);
  scene.add(cloud);

  var ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshBasicMaterial({ color: hex(), wireframe: true, transparent: true, opacity: 0.18 })
  );
  scene.add(ico);

  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(6.2, 0.012, 8, 80),
    new THREE.MeshBasicMaterial({ color: hex(), transparent: true, opacity: 0.22 })
  );
  ring.rotation.x = 1.1;
  scene.add(ring);

  function paint() {
    var c = hex();
    pointsMat.color.set(c);
    ico.material.color.set(c);
    ring.material.color.set(c);
  }
  window.addEventListener("mitsec-theme", paint);

  var mx = 0, my = 0;
  window.addEventListener("pointermove", function (e) {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
    my = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function tick() {
    cloud.rotation.y += 0.0009;
    cloud.rotation.x += 0.00025;
    ico.rotation.y -= 0.0016;
    ico.rotation.z += 0.0007;
    ring.rotation.z += 0.0012;
    camera.position.x += (mx * 2 - camera.position.x) * 0.04;
    camera.position.y += (-my * 1.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
