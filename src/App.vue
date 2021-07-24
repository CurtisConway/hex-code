<template>
  <div id="app">
<!--    <h1 v-for="(code, i) in hexGrid.solution" :key="`code-${i}`">{{ code }}</h1>-->
    <div class="container">
      <div class="table">
        <div class="row" v-for="(row, y) in hexGrid.grid" :key="`row-${y}`">
          <HexCell
            v-for="(cell) in row"
            :key="`cell(${cell.x},${cell.y})`"
            :hexCell="cell"
          />
        </div>

      </div>
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
    };
  },
};
</script>

<style lang="scss">
body {
  padding:0;
  margin:0;
  background-color:#545454;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  text-align:center;
  margin:0 auto;
  padding:5px;
  display:inline-block;
  filter:drop-shadow(0 0 5px rgba(0,0,0,1));
  border-radius:50%;
  background:black;
}

.table {
  margin:0 auto;
  padding:75px 0;
  position:relative;

  &:before {
    content: '';
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
  }
}

.row {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  margin-top:-25px;
  margin-bottom:-25px;
}

.cell {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:100px;
  width:100px;
  position:relative;
  color:#fff;
  cursor:pointer;
  z-index:1;
  user-select:none;
  animation-name:animatePoly;
  animation-duration:2s;
  animation-iteration-count:1;
  animation-timing-function:cubic-bezier(.5,.5,0,1);
  clip-path:polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%);

  &.active {
    &:after {
      background-color:#949494;
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
    background-color:#545454;
    z-index:-1;
    transition:all .2s ease;
    background-image:url(https://res.cloudinary.com/dloxgdltu/image/upload/v1626599024/samples/pngfind.com-hexagon-grid-png-6798481_hghtxm.png);
    background-size:105%;
    background-position:center;
    animation-name:animatePoly;
    animation-duration:2s;
    animation-iteration-count:1;
    animation-timing-function:cubic-bezier(.5,.5,0,1);
  }

  &:hover {
    &:after {
      background-color:#242424;
    }
  }

  p, h4 {
    animation-name:fadeIn;
    animation-iteration-count: 1;
    animation-duration:.5s;
  }
}

@keyframes animateShadow {
  from {
    filter:drop-shadow(0 0 5px rgba(0,0,0,0));
  }

  to {
    filter:drop-shadow(0 0 5px rgba(0,0,0,1));
  }
}

@keyframes animatePoly {
  0% {
    background-size:200%;
    clip-path:polygon(0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0% 100%);
  }
  50% {
    background-size:200%;
    clip-path:polygon(0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0% 100%);
  }
  100% {
    background-size:105%;
    clip-path:polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%);
  }
}
@keyframes fadeIn {
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
</style>
