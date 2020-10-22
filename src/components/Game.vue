<template>
    <div class="game">
        <h1>Minesweeper</h1>
        <div class="info-bar" :style="{width:boardWidth+'px'}">
            <DropdownMenu
                :options="['Easy', 'Medium']"
                v-model="difficulty"
            />
            <div class="mine-indicator">
                <svg style="width:32px;height:32px" viewBox="0 0 24 24">
                    <path class="flag" fill="currentColor" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
                </svg>
                <div style="padding-left: 5px">{{count}}</div>
            </div>
            <Timer 
                :running="timerRunning"
                :reset="resetTrigger"
            />
        </div>
        <div class="board">
            <BoardDisplay 
                :style="boardSize"
                :game="game"
                @uncover="startTimer"
            />
            <div v-if="status.done" :style="boardSize" class="end-game">
                <h1 v-if="status.exploded">You Lost</h1>
                <h1 v-else>You Won!</h1>
                <div class="play-again" @click="updateDifficulty">Play Again</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BoardDisplay from './BoardDisplay.vue';
import Timer from './Timer.vue';
import DropdownMenu from './DropdownMenu.vue';
import { difficulties, Difficulty } from '../difficulty';
import { MSGame } from '../engine/msgame.js';


@Component({
  components: {
    BoardDisplay,
    Timer,
    DropdownMenu
  },
})
export default class Game extends Vue {
    private game = new MSGame();
    private running = false;

    private resetTrigger = false;

    private difficulty = "Easy";

    startTimer() {
        this.running = true;
    }

    resetTimer() {
        this.resetTrigger = !this.resetTrigger;
    }

    get timerRunning() {
        return this.running && !this.status.done;
    }
    
    get count() {
        const status = this.game.getStatus();
        return status.nmines - (status.nmarked ?? 0);
    }

    get boardSize() {
        const widthPerCol = this.boardWidth/this.status.ncols;
        const height = widthPerCol * this.status.nrows;
        return {
            width: this.boardWidth + "px",
            height: height + "px"
        }
    }

    get boardWidth() {
        return Math.min(window.innerWidth-20, 520);
    }

    get status() {
        return this.game.getStatus();
    }

    @Watch('difficulty') 
    updateDifficulty(){
        const newDifficulty: Difficulty = difficulties[this.difficulty.toLowerCase()];
        this.game = new MSGame();
        this.game.init(newDifficulty.rows, newDifficulty.columns, newDifficulty.mines);
        this.running = false;
        this.resetTimer();
    }
}
</script>

<style scoped>
h1 {
    color: var(--text);
}

.game {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.info-bar {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: var(--text);
    padding-bottom: 20px;
}

.mine-indicator {
    display: flex;
    align-items: center;
}

.flag {
    color: #F44336;
}

.board {
    position: relative;
}

.end-game {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: RGBA(0, 0, 0, 0.5);
}

.play-again {
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 5px;
    padding: 5px;
    font-weight: 700;
    cursor: pointer;

}
</style>