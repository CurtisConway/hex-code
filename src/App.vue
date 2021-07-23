<template>
  <div id="app">
    <div class="container">
      <h1 v-for="(code, i) in codes" :key="`code-${i}`">{{ code }}</h1>
      <table>
        <tr v-for="(row, y) in hexGrid.grid" :key="`row-${y}`">
          <HexCell
            v-for="(cell) in row"
            :key="`cell(${cell.x},${cell.y})`"
            :hexCell="cell"
          />
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import HexGrid from './models/HexGrid';
import HexCell from './components/HexCell.vue';

export default {
  name: 'App',
  components: { HexCell },
  data() {
    return {
      hexGrid: new HexGrid(3),
      codes: [],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  text-align:center;
  max-width:960px;
  margin:0 auto;
}

table {
  margin:0 auto;
}

tr {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  margin-top:-25px;
  margin-bottom:-25px;
}

td {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:100px;
  width:100px;
  position:relative;
  color:#fff;
  cursor:pointer;

  &.active {
    &:after {
      background:white;
    }
  }

  &:after {
    content: '';
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    clip-path:polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%);
    background:black;
    z-index:-1;
    transition:all .2s ease;
  }

  &:hover {
    &:after {
      background:#242424;
    }
  }
}
</style>
