<template>
    <div class="wrapper" id="wrapper">
        <SketchRule
                :lang="lang"
                :thick="thick"
                :scale="scale"
                :width="width"
                :height="height"
                :startX="startX"
                :startY="startY"
                :shadow="shadow"
                :palette="palette"
                :horLineArr="lines.h"
                :verLineArr="lines.v"
                :cornerActive="true"
                :isOpenMenuFeature="true"
                :isShowRuler="true"
                :isShowReferLine="true"
                @handleLine="handleLine"
                @onCornerClick="handleCornerClick"
        >
        </SketchRule>
        <div
                ref='screensRef'
                id="screens"
                @wheel="handleWheel"
                @scroll="handleScroll"
        >
            <div ref="containerRef" class="screen-container">
                <div id="canvas" :style="canvasStyle" >
                    <slot/>
                </div>
            </div>
        </div>
        <div class="sliderBody">
            <KemInputSlider v-model="scale" :step="0.01" showInput :max="1" :range="false"></KemInputSlider>

        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import SketchRule from "vue-sketch-ruler";

export default Vue.extend({
    props: {
        rectWidth: {
            type: Number,
            default: 1960
        },
        rectHeight: {
            type: Number,
            default: 1080
        },
    },
    data() {
        return {
            scale: 1, //658813476562495, //1,
            palette:{
                "bgColor":"#190490",
                "longfgColor":"#bc383f",
                "shortfgColor":"#dff9f9",
                "fontColor":"#dff9f9",
                "shadowColor":"#190490",
                "lineColor":"#190490",
                "borderColor":"#DADADC",
                "cornerActiveColor":"rgba(120,68,235,0.6)",
                "menu":
                    {
                        "bgColor":"#a18aff",
                        "dividerColor": "#122adb",
                        "listItem": {
                            "textColor":"#415058",
                            "hoverTextColor":"#298DF8",
                            "disabledTextColor":"rgba(65, 80, 88, 0.4)",
                            "bgColor":"#fff","hoverBgColor":"#F2F2F2"
                        }
                    }
            },
            startX: 0,
            startY: 0,
            lines: {
                h: [],
                v: []
            },
            thick: 25,
            width: 1960,
            height: 1080,
            lang: "zh-CN", // 中英文
            isShowRuler: true, // 显示标尺
            isShowReferLine: true // 显示参考线
        }
    },
    components: {
        SketchRule
    },
    computed: {
        shadow() {
            return {
                x: 0,
                y: 0,
                width: this.rectWidth,
                height: this.rectHeight
            }
        },
        canvasStyle() {
            return {
                width: this.rectWidth + 'px',
                height: this.rectHeight + 'px',
                transform: `scale(${this.scale})`
            }
        }
    },
    watch: {
        scale() {
            this.handleScroll();
        }
    },
    methods: {
        handleLine(lines) {
            this.lines = lines;
        },
        handleCornerClick() {
            return;
        },
        handleScroll() {
            const screensRect = document
                .querySelector("#screens")
                .getBoundingClientRect();
            const canvasRect = document
                .querySelector("#canvas")
                .getBoundingClientRect();

            // 标尺开始的刻度
            const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale;
            const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale;

            this.startX = startX >> 0;
            this.startY = startY >> 0;
        },
        // 控制缩放值
        handleWheel(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const nextScale = parseFloat(
                    Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
                );
                this.scale = nextScale;
            }
            this.$nextTick(() => {
                this.handleScroll();
            });
        },
        initSize() {
            const wrapperRect = document
                .querySelector("#wrapper")
                .getBoundingClientRect();
            const borderWidth = 1;
            this.width = wrapperRect.width - this.thick - borderWidth;
            this.height = wrapperRect.height - this.thick - borderWidth;
        }
    },
    mounted() {
        // // 滚动居中
        // this.$refs.screensRef.scrollLeft =
        //     this.$refs.containerRef.getBoundingClientRect().width / 2 - 300; // 300 = #screens.width / 2
        this.$nextTick(() => {
            this.initSize();
        });
    }
});
</script>
<style lang="scss">
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    overflow: hidden; }

body * {
    box-sizing: border-box;
    user-select: none; }

.wrapper {
    background-color: #3cf5ff;

    width: 100%;
    height: 100%;
    border: 1px solid #90174c;
    position: relative;
    .sliderBody{
        padding: 10px;
        width: 400px;
        position: absolute;
        z-index: 99;
        right: 20px;
        bottom: 20px;
        background-color: #ffffff;
    }
}

#screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;


}

.screen-container {
    position: absolute;
    width: 4000px;
    height: 2000px; }

.scale-value {
    position: absolute;
    left: 0;
    bottom: 100%; }

.button {
    position: absolute;
    left: 100px;
    bottom: 100%; }

.button-ch {
    position: absolute;
    left: 200px;
    bottom: 100%; }
.button-en {
    position: absolute;
    left: 230px;
    bottom: 100%; }

#canvas {
    position: absolute;
    top: 80px;
    left: 80px;

    background: lightblue;
    transform-origin: 0% 0%;
}
</style>
