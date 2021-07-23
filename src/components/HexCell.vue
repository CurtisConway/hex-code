<template>
  <td @click="setCellActive" :class="{'active': hexCell.active}">
    <h4>
      {{ hexCell.value }}
    </h4>
    <p>
      {{ hexCell.x }}, {{ hexCell.y }}
    </p>
  </td>
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
  computed: {
    code() {
      return this.hexCell.code;
    },
  },
  methods: {
    setCellActive() {
      console.log('hello?');
      this.hexCell.setActive(!this.hexCell.active);
    },
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
