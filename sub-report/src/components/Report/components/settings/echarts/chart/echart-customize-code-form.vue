<template>
    <div class="monaco-container">
        <div ref="container" class="monaco-editor"></div>
    </div>
</template>
<script>
    import * as monaco from 'monaco-editor'
    import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

    export default {
        props: ['chart'],
        data(){
            return {
                editor: null,
                editorOptions:  {
                    value: "",
                    language: 'javascript',
                    theme: 'vs',
                    automaticLayout: true,
                    minimap: {
                        enabled: false
                    },
                }
            }
        },
        mounted () {
            setTimeout (()=> {
                this.$nextTick(() => {
                    this.editorOptions.value = this.chart.chart_settings.chart_code
                    this.editor = monaco.editor.create(this.$refs.container, this.editorOptions)
                    this.editor.setValue(this.chart.chart_settings.chart_code)

                    this.editor.onDidChangeModelContent(() => {
                        let changeContent = this.editor.getValue()
                        this.chart.chart_settings.chart_code = changeContent
                    })
                })
            }, 100)

        },
        beforeDestroy(){
            if(this.editor){
                this.editor.dispose();
            }
        },
        methods: {
            onMounted (editor) {
                this.editor = editor;
            },
            onChange(){

            }
        }
    }
</script>
<style scoped>
    .monaco-container{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .monaco-editor {
        width: 100%;
        min-height: 600px;
        height: 100%;
        max-height: 100% !important;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>