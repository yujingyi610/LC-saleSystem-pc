<template>
    <div class="iframe-wrap">
        <iframe v-show="iframeState" frameborder=0 name="showHere" scrolling="no" :src="iframeSrc">
            <p>Your browser does not support iframes.</p>
        </iframe>
    </div>
</template>

<script>
    export default {
        props: {
            iframeSrc: String
        },
        data() {
            return {
                iframeState: true
            }
        },
        methods: {
            // setIframeHeight(iframe) {
            //     if (iframe) {
            //         var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            //     if (iframeWin.document.body) {
            //         iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            //         }
            //     }
            // }
            reinitIframe(iframe){
                try{
                var bHeight = iframe.contentWindow.document.body.scrollHeight;
                var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
                var height = Math.max(bHeight, dHeight);
                iframe.height = height;
                }catch (ex){}
            }
        },
        mounted() {
            let iframe = document.getElementById('show-iframe');
            // this.reinitIframe(iframe)

        }
    }
</script>

<style scoped>
.iframe-wrap iframe{
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>