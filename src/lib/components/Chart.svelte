<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  let { type, data, options } = $props();
  let canvas: HTMLCanvasElement;
  let chart: Chart;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
        chart = new Chart(ctx, {
        type,
        data,
        options
        });
    }

    return () => {
      if (chart) chart.destroy();
    };
  });
</script>

<div class="relative w-full h-full">
    <canvas bind:this={canvas}></canvas>
</div>
