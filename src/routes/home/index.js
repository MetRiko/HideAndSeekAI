import { h } from 'preact';
import style from './style.css';
import { P5Core } from '../../core/P5Core';
import { setupP5 } from '../../core/Game';

const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
		<P5Core setupP5={setupP5}/>
	</div>
);

export default Home;
