<template>
  <div ref="mainElement">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import _ from "lodash"
import { onMounted, ref ,nextTick} from 'vue'
const mainElement = ref<HTMLDivElement | null>(null);

onMounted(() =>{
  nextTick(() =>{
    if(mainElement.value)
    {
      const standardScale = (("100%") as any) / (("100%") as any);
      window.addEventListener("resize", _.debounce(function (){
        const docHeight = document.body.clientHeight;
        const docWidth = document.body.clientWidth;
        if(docWidth < 1680)
        {
          const currentSacle = docHeight / docWidth;
          let [scale, translate]:any = [0,0];
          if(currentSacle < standardScale){
            // 以高度计算
            scale = docHeight / 1080;
            const shouleWidth = 1920 * scale;
            const offsetWidth = docWidth - shouleWidth;
            translate = offsetWidth > 0 ? `translate(${offsetWidth / 2}px, 0)` : "";
          }
          else{
            // 以宽度计算
            scale = docWidth / 1920;
            const shouleHeight = 1080 * scale;
            const offsetHeight = docHeight - shouleHeight;
            translate =  offsetHeight > 0 ? `translate(0, ${offsetHeight / 2}px)` : "";
          }
          mainElement.value.style.cssText = `
            transform: scale(${scale}) ${translate};transform-origin: top left;
            min-width: 1920px;
            min-height: 1080px;
          `;
        }
        else{
          mainElement.value.style.cssText = "";
        }
      },0));
      if(document.createEvent){
        var event = document.createEvent("HTMLEvents");
        event.initEvent("resize",true,true);
        window.dispatchEvent(event);
      }
      else if(typeof Event === 'function')
      {
        window.dispatchEvent(new Event('resize'));
      }
    }
  })
})


</script>

<style scoped lang="scss">

</style>
