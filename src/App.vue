

<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Konva from "konva";
import { ElectriGraphic } from "./Electric/ElectricGraphic";
import { ElectricData } from "./Electric/data";

onMounted(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  const layer = new Konva.Layer();

  const group = new Konva.Group();

  const electricGraphic = new ElectriGraphic(ElectricData, {}, group);

  electricGraphic.render();

  // group.scale({ x: 1.5, y: 0.5 });
  layer.add(group);

  stage.add(layer);

  layer.draw();
});
</script>


<style scoped>
/* #container {
} */

#result {
  position: absolute;
  right: 20px;
  top: 20px;
}
.container {
  background: #eee;
}
</style>
