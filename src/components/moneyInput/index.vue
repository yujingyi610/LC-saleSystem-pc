<template>
	<div class="money-input-box">
		<el-input @keydown.native="handleChange" ref="input" v-model="val" v-bind="$attrs" />
	</div>
</template>

<script>
function formatMoney(num) {
  num = num === null ? "" : (num += "");
  num = +num.split(",").join("");
  return (num || "").toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
export default {
  props: ["value"],
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    handleChange(event) {
    let oldVal = this.val;
    setTimeout(() => {
        let keyCode = event.keyCode;
        let key = [
        8,
        13,
        37,
        39,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105
        ];
        if (key.indexOf(keyCode) === -1) {
        this.val = oldVal;
        } else {
        this.val = formatMoney(this.val);
        }
        this.$nextTick(() => {
        this.$emit("input", this.val);
        });
    }, 0);
    }
    }
}
</script>

<style lang="scss" scoped>
.money-input-box {
}
</style>