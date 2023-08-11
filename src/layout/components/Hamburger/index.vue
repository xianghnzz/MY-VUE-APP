<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue';

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits<{
    (e: 'toggle-click'): void;
}>();

const toggleClick = () => {
    emit('toggle-click');
};
</script>

<template>
    <div
        :class="['c-humburger', !props.isActive ? 'closed' : '']"
        @click="toggleClick"
    >
        <el-icon class="c-humburger__icon">
            <Fold v-if="props.isActive" />
            <Expand v-else />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.c-humburger {
    $c: &;

    width: 0;
    height: var(--plm-hamburger-height);
    border-right: var(--plm-hamburger-width) solid
        rgba($color: $darker-blue, $alpha: 0.8);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    position: relative;
    cursor: pointer;

    &__icon {
        vertical-align: middle;
        color: #fff;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 20px;
        height: 20px;
        svg {
            width: 18px;
            height: 18px;
        }
    }

    &.closed {
        border-left: var(--plm-hamburger-width) solid
            rgba($color: $darker-blue, $alpha: 0.8);
        border-right: none;

        #{$c}__icon {
            left: auto;
            right: 0;
        }
    }
}
</style>
