<template>
  <div class="cell" @click="setCellActive" :class="{'active': hexCell.active}">
    <div class="square">
      <h4 v-show="showNumbers">
        {{ hexCell.value }}
      </h4>
    </div>

<!--    <p v-show="showNumbers">-->
<!--      {{ hexCell.x }}, {{ hexCell.y }}-->
<!--    </p>-->
  </div>
</template>

<script>
import HexCell from '../models/HexCell';

export default {
  name: 'HexCell',
  props: {
    hexCell: {
      type: HexCell,
      default: () => new HexCell(),
    },
  },
  data() {
    return {
      showNumbers: false,
    };
  },
  computed: {
    code() {
      return this.hexCell.code;
    },
  },
  methods: {
    setCellActive() {
      this.hexCell.setActive(!this.hexCell.active);
      this.$emit('setActive', this.hexCell);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showNumbers = true;
    }, 2000);
  },
};
</script>

<style>
  h4 {
    margin:0;
    font-size:24px;
  }
  p {
    margin:0;
    font-size:10px;
  }
</style>
