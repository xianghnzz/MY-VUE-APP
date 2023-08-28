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
        <el-icon
            class="c-humburger__icon"
            color="#ffffff"
            :size="16"
        >
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
    height: 90px;
    border-right: 20px solid rgba($color: #00283e, $alpha: 0.8);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    cursor: pointer;
    position: relative;

    &__icon {
        vertical-align: middle;
        color: #fff;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(-8px, -50%);
    }

    // &.closed {
    //     border-left: var(--plm-hamburger-width) solid rgba($color: $darker-blue, $alpha: 0.8);
    //     border-right: none;

    //     #{$c}__icon {
    //         left: auto;
    //         right: 0;
    //     }
    // }
}
</style>
