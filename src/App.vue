<template>
  <div id="app">
    <div class="container">
      <div class="square">
        <div v-if="isWaiting || canReplay" class="score-board">
          <h1 v-show="canReplay">
            {{ isFailure ? 'Failure' : 'Success!' }}
          </h1>
          <button @click="playGame">
            Play{{ canReplay ? ' Again' : '' }}
          </button>
        </div>
        <div v-if="isPlaying" class="table">
          <div class="row" v-for="(row, y) in hexGrid.grid" :key="`row-${y}`">
            <HexCell
              v-for="(cell) in row"
              :key="`cell(${cell.x},${cell.y})`"
              :hexCell="cell"
              @setActive="handleSetActive"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="isPlaying">
      <svg
        viewBox="0 0 50 50"
        height="50"
        width="50"
        v-for="n in remainingInputs"
        :key="`input-${n}`">
        <circle cx="25" cy="25" r="25"/>
      </svg>
    </div>
  </div>
</template>

<script>
import HexGrid from './models/HexGrid';
import HexCell from './components/HexCell.vue';
import { GAME_STATES } from './constants';

export default {
  name: 'App',
  components: { HexCell },
  data() {
    return {
      hexGrid: new HexGrid(3),
      remainingInputs: 3,
      gameState: GAME_STATES.waiting,
    };
  },
  computed: {
    isWaiting() {
      return this.gameState === GAME_STATES.waiting;
    },

    isPlaying() {
      return this.gameState === GAME_STATES.playing;
    },

    isSuccess() {
      return this.gameState === GAME_STATES.success;
    },

    isFailure() {
      return this.gameState === GAME_STATES.failure;
    },

    canReplay() {
      return this.isSuccess || this.isFailure;
    },
  },
  methods: {
    playGame() {
      this.hexGrid = new HexGrid(3);
      this.gameState = GAME_STATES.playing;
      this.remainingInputs = 3;
    },

    handleSetActive(hexCell) {
      this.remainingInputs -= 1;
      if (this.remainingInputs === 0) {
        const gameWon = this.hexGrid.list.filter((hex) => hex.active).length === 0;
        if (gameWon) {
          this.gameState = GAME_STATES.success;
        } else {
          this.gameState = GAME_STATES.failure;
        }
      }
    },
  },
};
</script>

<style lang="scss">
body {
  padding:20px;
  margin:0;
  background-color:#545454;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  text-align:center;
  margin:0 auto;
  display:block;
  filter:drop-shadow(0 0 5px rgba(0,0,0,1));
  border-radius:50%;
  background:black;
  width:100%;
  max-width:500px;
}

.square {
  position:relative;
  height:0;
  padding-bottom:100%;
  width:100%;
}

.score-board {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  color:#fff;

  button {
    height:50px;
    padding:5px 20px;
    border:1px solid #fff;
    color:#fff;
    background:transparent;
    border-radius:5px;
    font-size:24px;
    cursor:pointer;
    transition:background .2s ease;

    &:hover {
      background:#141414;
    }
  }

  h1 {
    margin-top:0;
  }
}

.table {
  margin:0 auto;
  padding:15% 0;
  position:relative;

  &:before {
    content: '';
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
  }

  .row {
    margin-top:-5%;
    margin-bottom:-5%;
  }
}

.row {
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;

  svg {
    margin:20px;
    filter:drop-shadow(0 0 5px rgba(0,0,0,1));
  }
}

.cell {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  //height:100px;
  width:20%;
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

  p, h4 {
    animation-name:fadeIn;
    animation-iteration-count: 1;
    animation-duration:.5s;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
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
