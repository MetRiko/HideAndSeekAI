import loadable from '@loadable/component'
const LoadableP5Wrapper = loadable(() => import("react-p5-wrapper"))

export let p5 = null

export function P5Core({setupP5}) {
  const sketch = (_p5) => {
    p5 = _p5
    setupP5(_p5)
    // p5.setup = () => {};
    // p5.draw = () => {};
  };

  return <LoadableP5Wrapper sketch={sketch} />
}