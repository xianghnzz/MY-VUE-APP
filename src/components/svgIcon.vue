<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
    defineProps<{
        prefix?: string;
        name: string;
        color?: string;
        width?: string;
        height?: string;
    }>(),
    {
        prefix: 'icon',
        color: '#333',
        width: '1em',
        height: '1em'
    }
);
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<template>
    <svg
        aria-hidden="true"
        class="c-svg-icon"
        :width="width"
        :height="height"
        :fill="color"
    >
        <use :href="symbolId" />
    </svg>
</template>
<style lang="scss" scoped></style>
