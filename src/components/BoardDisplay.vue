<template>
    <div class="grid" :style="gridDimensions">
        <div v-for="(item, index) in displayGrid" :key="index" class="border">
            <Tile 
                :display="item.display"
                @click="uncover(item.row, item.column)" 
                @right-click="mark(item.row, item.column)"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tile from './Tile.vue';

@Component({
  components: {
    Tile,
  },
})
export default class BoardDisplay extends Vue {
    @Prop() private msg!: string;
    // eslint-disable-next-line
    @Prop() private game!: any;

    get displayGrid() {
        const arr = []
        let rowNum = 0;
        for (const row of this.grid) {
            let colNum = 0
            for (const char of row) {
                const item = {
                    column: colNum,
                    row: rowNum,
                    display: char
                }
                arr.push(item);
                colNum++;
            }
            rowNum++;
        }
        return arr;
    }

    get gridDimensions() {
        return {
            "--columns": this.grid[0].length,
            "--rows": this.grid.length
        }
    }

    get grid() {
        return this.game.getRendering();
    }

    uncover(row: number, col: number) {
        this.game.uncover(row, col);
        this.$emit('uncover');
    }

    mark(row: number, col: number) {
        this.game.mark(row, col);
        window.navigator.vibrate(50);
    }

}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    gap: 1px;
}
.border {
    outline: 1px solid var(--divider-color);
    z-index: 1;
}
</style>