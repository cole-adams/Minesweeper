<template>
    <div class="dropdown">
        <div @click="toggle" class="dropbtn">
            <div>{{ selected }}</div>
            <svg v-if="!isActive" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
            </svg>
            <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
            </svg>
        </div>
        <div v-if="isActive" class="dropdown-content">
            <div 
                v-for="item in options" 
                :key="item"
                @click="select(item)" 
                class="dropdown-item"
            >
                {{item}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownMenu extends Vue {
    @Prop() options!: string[];
    @Prop() value!: string;

    private selected = "";

    private isActive = false;

    mounted() {
        this.selected = this.value;
    }

    toggle() {
        this.isActive = !this.isActive;
    }

    select(item: string) {
        this.selected = item;
        this.$emit('input', this.selected);
        this.toggle();
    }
}
</script>

<style scoped>
.dropbtn {
    color: black;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    padding: 5px;
}

.dropdown {
    position: relative;
    display: inline-block;
    background-color: #FFFFFF;
    border-radius: 5px;
}

.dropdown-content {
    display: block;
    position: absolute;
    background-color: #FFFFFF;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 3;
    border-radius: 5px;
}

.dropdown-item {
    color: black;
    padding: 5px;
    display: block;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #ededed;
    border-radius: 5px;
}
</style>