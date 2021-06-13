

const clamp = (min, max, value) => Math.min(Math.max(value, min), max)

const arcContainsPoint = (centerX, centerY, radius, startingAngle, endingAngle, x, y) => {
	const PI = Math.PI
	const TWO_PI = PI * 2.0

    const r = Math.sqrt(Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2));
    const a = Math.atan2(y - centerY, x - centerX) + PI; //+PI to shift to a standard circle

    //Convert the angle to a standard trigonometric circle
    const s = (startingAngle + PI) % TWO_PI;
    const e = (endingAngle + PI) % TWO_PI;

    //Inspired by
    //https://stackoverflow.com/questions/6270785/how-to-determine-whether-a-point-x-y-is-contained-within-an-arc-section-of-a-c
    if (r < radius) {
    	if (s < e) {
    		if (a > s && a < e) {
    			return true;
    		}
    	}
    	if (s > e) {
    		if (a > s || a < e) {
    			return true;
    		}
    	}
    }
    return false;
}

const Utils = {
	clamp,
	arcContainsPoint
}

export default Utils
