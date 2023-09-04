<script setup lang="tsx">
const TestComponent: any = {
    render() {
        return <div>{123}</div>;
    }
};
</script>
<template>
    <TestComponent />
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
</style>
