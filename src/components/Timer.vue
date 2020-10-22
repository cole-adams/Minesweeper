<template>
    <div class="mine-indicator">
        <svg style="width:32px;height:32px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 6C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13S7.03 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39M13 14H11V7H13V14M15 1H9V3H15V1Z" />
        </svg>
        <div style="padding-left: 5px">{{('00' + time).substr(-3)}}</div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
    @Prop() private running!: boolean;
    @Prop() private reset!: boolean;

    private timerStart!: number;
    private time = 0;
    private interval!: number;

    @Watch('running')
    toggleTimer(newRunning: boolean) {
        if (newRunning) {
            this.timerStart = new Date().getTime();
            this.interval = setInterval(this.updateTimer, 1);
        } else {
            clearInterval(this.interval);
        }
    }

    @Watch('reset')
    resetTimer() {
        this.timerStart = new Date().getTime();
        this.updateTimer();
    }

    updateTimer() {
        const dt = new Date().getTime() - this.timerStart;
        this.time = Math.min(Math.round(dt/1000), 999);
    }
}
</script>