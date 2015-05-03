import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from '../../src/subunit';
import { camera, scene, renderer } from './common/scene';
import { uvMapper } from './common/sprite-uvs';
import { sphere } from './common/layouts';

var sprite = THREE.ImageUtils.loadTexture('images/zombies.jpg', null);

d3.json('data/zombies.json', function (err, data) {

  var uvsMap = uvMapper(data.images);

  var options = {map: sprite, side: THREE.DoubleSide};
  var material = new THREE.MeshLambertMaterial(options);

  var root = SubUnit.select(scene);

  root.selectAll(".zombie")
    .data(data.images).enter()
    .append("mesh")
      .attr("tags", "zombie")
      .attr("material", material)
      .attr("geometry", function (d) {
        var geometry = new THREE.PlaneBufferGeometry(300, 430);
        var buffer = new THREE.BufferAttribute(uvsMap(d), 2);

        geometry.addAttribute('uv', buffer);

        return geometry;
      })
      .each(function (d, i) {
        this.scale.set(0.4, 0.4, 0.4);
        this.position.copy(sphere(i, data.images.length, 750));
        this.lookAt(root.node().position);
        this.rotation.y += Math.PI;
      });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});

