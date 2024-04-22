<template>
  <div style="width:100%; height: calc(100% - 16px);" ref="mainElement">
    <div class="nav_list" v-if="proxy.$route.path!='/main' && proxy.$route.path!='/login'">
       <ul>
          <li v-for="(record, index) in routes" :key="index" @click="clickNav(record,index)" >
             <template v-if="index == 0"><img  src="@/assets/images/main_icon.png" alt=""></template>
             <template v-if="index > 0"><span :class="{ 'default_li': index < routes.length - 1 , 'current_li': index == (routes.length - 1) }">{{record.name}}</span></template>
             <span v-if="index != (routes.length - 1)">/</span>
          </li>
       </ul>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import { onMounted, ref ,nextTick, getCurrentInstance, computed, watch} from 'vue'
const { proxy }: any = getCurrentInstance()

const routes = ref([]);

const mainElement = ref<HTMLDivElement | null>(null);



// 实时监听路由变化
watch(() => proxy.$route,
      (to, from) => {
        // 在路由变化时执行其他操作
        var index = routes.value.findIndex(route => route.path == to.path)
        if(index != -1)
        {
          routes.value = routes.value.slice(0,index + 1);
        }
        else if(to.path=="/main"){
           routes.value = [{
            name: to.name,
            path: to.path
          }];
        }
        else if(to.path!="/main" && to.path!="/login"){
          routes.value.push({
            name: to.name,
            path: to.path,
            query: to.query
          });
        }
        var appEl = document.getElementById("app");
        if(to.path == "/login" && appEl){
          appEl.style.cssText = `padding: 0px !important`;
          if(mainElement.value){
            mainElement.value.style.height = "100%";
          }
        }
        else if(to.path == "/main" && appEl){
          appEl.style.cssText = "padding: 16px !important";
          if(mainElement.value){
            mainElement.value.style.height = "100%";
          }
        }
        else{
          appEl.style.padding = "0px 16px 16px 16px";
          if(mainElement.value){
            mainElement.value.style.height = "calc(100% - 16px)";
          }
        }

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
    );

onMounted(() =>{
  nextTick(() =>{
    if(mainElement.value)
    {
      const standardScale = (("100%") as any) / (("100%") as any);
      window.addEventListener("resize", _.debounce(function (){
        if(proxy.$route.path!="/login"){
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
              scale = (docWidth-20) / 1920;
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
            if(mainElement.value){
              mainElement.value.style.cssText = "width: 100%; height: calc(100% - 16px)";
            }
          }
          let appEl = document.getElementById("app");
          if(appEl && proxy.$route.path!="/main"){
            appEl.style.cssText = `padding: 0px 16px 16px 16px`
          }
        }
        else{
          let appEl = document.getElementById("app");
          mainElement.value.style.cssText = `width: 100%; height: 100%`;
          if(appEl){
            appEl.style.cssText = `padding: 0px 0px 0px 0px`
          }
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


const clickNav = (item,index) =>{
  if(index != routes.value.length - 1)
  {
    proxy.$router.push({
      path: item.path, 
      query: item.query
    })
  }
}

</script>

<style scoped lang="scss">
.nav_list{
  width:100%;
  height: 25px;
  margin: 8px 0px;
  ul{
    list-style: none;
    width: 100%;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0px;
    box-sizing: border-box;
    li{
      display: flex;
      cursor: pointer;
      align-items: center;
      height: 25px;
      justify-content: center;
    }
    .default_li{
      font-family: Alibaba PuHuiTi 2.0;
      font-size: 14px;
      font-weight: 500;
      color: #4E5969;
    }
    .current_li{
      color: #1D2129;
      font-size: 14px;
      font-weight: 600;
    }
    img{
      margin-right: 3px;
      margin-bottom: 1px;
    }
    span{
      margin: 0px 3px;
      color: #4E5969;
    }
  }
}
</style>
