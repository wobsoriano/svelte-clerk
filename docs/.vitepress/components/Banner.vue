<script setup>
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

defineProps({
	version: {
		type: String,
		required: true
	}
});

const el = ref();
const { height } = useElementSize(el);

watchEffect(() => {
	if (height.value) {
		document.documentElement.style.setProperty('--vp-layout-top-height', `${height.value + 16}px`);
	}
});
</script>

<template>
	<div ref="el" class="banner">
		<div class="text">
			This package is unofficial and not affiliated with Clerk. If you have issues or suggestions,
			please open an issue in the
			<a href="https://github.com/wobsoriano/svelte-clerk">repository</a>.
		</div>
	</div>
</template>

<style>
.banner-dismissed {
	--vp-layout-top-height: 0px !important;
}
html {
	--vp-layout-top-height: 88px;
}
@media (min-width: 375px) {
	html {
		--vp-layout-top-height: 64px;
	}
}
@media (min-width: 768px) {
	html {
		--vp-layout-top-height: 40px;
	}
}
</style>

<style scoped>
.banner-dismissed .banner {
	display: none;
}
.banner {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: var(--vp-z-index-layout-top);
	padding: 8px;
	text-align: center;
	background: #383636;
	color: #fff;
	display: flex;
	justify-content: space-between;
}
.text {
	flex: 1;
}
a {
	text-decoration: underline;
}
</style>
