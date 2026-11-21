---
name: performance-profiling
description: "Profile and optimize application performance — Chrome DevTools, Node.js clinic.js, flame graphs, memory leak detection, and performance budgets."
license: MIT
---

You can't optimize what you can't measure. Profiling turns
"it feels slow" into "this specific function takes 340ms on
the main thread."

## Chrome DevTools performance audit

```markdown
## Recording a performance profile
1. Open DevTools → Performance tab
2. Click Record, interact with the page, Stop
3. Focus on: Long tasks (>50ms), Layout shifts, Scripting time

## Key metrics to examine
- **FPS**: Should be 60fps consistently
- **CPU**: Main thread shouldn't be >80% utilized
- **Memory**: Look for growing heap over time (leak)

## Common bottlenecks
- Excessive DOM size (>1500 nodes)
- Forced synchronous layouts (reading layout properties after writing)
- Long-running JavaScript blocking the main thread
- Unoptimized images (no lazy loading, oversized)
```

## Node.js profiling with clinic.js

```bash
# Doctor: automated diagnosis
npx clinic doctor -- node server.js
# Interact with app, then Ctrl+C
# Generates HTML report with recommendations

# Flame: CPU profiling
npx clinic flame -- node server.js
# Shows which functions consume the most CPU

# Bubbleprof: async profiling
npx clinic bubbleprof -- node server.js
# Shows async operations and event loop lag

# Heap: memory profiling
npx clinic heap -- node server.js
# Identifies memory leaks and high allocation
```

## Performance budgets

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "200kb",
      "maximumError": "300kb"
    },
    {
      "type": "bundle",
      "name": "vendor",
      "maximumWarning": "100kb",
      "maximumError": "150kb"
    }
  ],
  "thresholds": {
    "first-contentful-paint": "1.5s",
    "largest-contentful-paint": "2.5s",
    "cumulative-layout-shift": "0.1",
    "total-blocking-time": "200ms",
    "time-to-interactive": "3.5s"
  }
}
```

## Memory leak detection

```typescript
// React: detect component memory leaks
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    const res = await fetch('/api/data', {
      signal: controller.signal,
    });
    const data = await res.json();
    setData(data);
  }

  fetchData();

  // Cleanup on unmount
  return () => controller.abort();
}, []);

// Node.js: monitor heap usage
setInterval(() => {
  const mem = process.memoryUsage();
  console.log({
    rss: `${Math.round(mem.rss / 1024 / 1024)}MB`,
    heap: `${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
    external: `${Math.round(mem.external / 1024 / 1024)}MB`,
  });
}, 30000);
```

## Web Vitals monitoring

```typescript
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use sendBeacon for non-blocking analytics
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true });
  }
}

onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
onINP(sendToAnalytics);
```

## Profiling checklist

```markdown
## CPU
- [ ] Record performance profile in DevTools
- [ ] Identify long tasks (>50ms)
- [ ] Check for forced synchronous layouts
- [ ] Profile server-side rendering time
- [ ] Measure Time to Interactive (TTI)

## Memory
- [ ] Monitor heap size over time
- [ ] Take heap snapshots at different points
- [ ] Compare snapshots to find leaked objects
- [ ] Check for detached DOM nodes
- [ ] Verify event listener cleanup

## Network
- [ ] Measure First Byte Time (TTFB < 200ms)
- [ ] Check for render-blocking resources
- [ ] Verify resource compression (gzip/brotli)
- [ ] Audit image sizes and formats
- [ ] Check cache hit rates

## Rendering
- [ ] Measure First Contentful Paint (FCP < 1.8s)
- [ ] Check Largest Contentful Paint (LCP < 2.5s)
- [ ] Monitor Cumulative Layout Shift (CLS < 0.1)
- [ ] Verify no layout thrashing
```

## Anti-patterns

- Don't optimize without measuring — profile first
- Don't ignore the main thread — JavaScript blocks rendering
- Don't skip cleanup — event listeners and timers cause memory leaks
- Don't trust synthetic benchmarks — measure real user performance
- Don't optimize images without measuring — check if they're actually slow
