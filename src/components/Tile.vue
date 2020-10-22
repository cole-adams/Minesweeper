<template>
    <div 
        @click="$emit('click')"
        @contextmenu.prevent="$emit('right-click')" 
        class="tile" 
        :class="{ hidden: hidden}"
    >
        <svg v-if="num > 0 && !hidden" style="width:90%;height:90%;" viewBox="0 0 24 24">
            <text class="number" :style="{color: color[num]}" fill="currentColor" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" style="overflow:visible">{{num}}</text>
        </svg>
        <svg v-if="marked" style="width:70%;height:70%" viewBox="0 0 24 24">
            <path class="flag" fill="currentColor" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
        </svg>
        <svg v-else-if="bomb" style="width:70%;height:70%" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11.25,6A3.25,3.25 0 0,1 14.5,2.75A3.25,3.25 0 0,1 17.75,6C17.75,6.42 18.08,6.75 18.5,6.75C18.92,6.75 19.25,6.42 19.25,6V5.25H20.75V6A2.25,2.25 0 0,1 18.5,8.25A2.25,2.25 0 0,1 16.25,6A1.75,1.75 0 0,0 14.5,4.25A1.75,1.75 0 0,0 12.75,6H14V7.29C16.89,8.15 19,10.83 19,14A7,7 0 0,1 12,21A7,7 0 0,1 5,14C5,10.83 7.11,8.15 10,7.29V6H11.25M22,6H24V7H22V6M19,4V2H20V4H19M20.91,4.38L22.33,2.96L23.04,3.67L21.62,5.09L20.91,4.38Z" />
        </svg>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Tile extends Vue {
  @Prop() private display!: string;

  private color = {
      1: "#2196F3",
      2: "#4CAF50",
      3: "#F44336",
      4: "#3F51B5",
      5: "#FF5722",
      6: "#009688",
      7: "#CDDC39",
      8: "#673AB7"
  }

  get hidden() {
      return this.display === 'H' || this.display === 'F';
  }

  get marked() {
      return this.display === 'F';
  }

  get bomb() {
      return this.display === 'M';
  }

  get num() {
      return parseInt(this.display);
  }
}
</script>

<style scoped>
.tile {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-light);
}
.hidden {
    background-color: var(--primary-dark);
}
.flag {
    color: #F44336;
}
.number {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}
</style>