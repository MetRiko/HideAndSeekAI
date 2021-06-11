import P5Wrapper from "react-p5-wrapper"

export let p5 = null

export function P5Core({setupP5}) {
  const sketch = (_p5) => {
	p5 = _p5
	setupP5(_p5)
    // p5.setup = () => {};
    // p5.draw = () => {};
  };

  return <P5Wrapper sketch={sketch} />
}