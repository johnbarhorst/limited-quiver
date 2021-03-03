import { Layout, TextInput } from 'components';
import { useInput } from 'hooks';

const KitchenSink = () => {
	const [name] = useInput('');
	return (
		<Layout>
			<h1>Limited Quiver</h1>
			<h2>Limited Quiver</h2>
			<h3>Limited Quiver</h3>
			<h4>Limited Quiver</h4>
			<h5>Limited Quiver</h5>
			<section>
				<h3>Headlines!</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, debitis velit consectetur repudiandae in libero non, nesciunt ipsum culpa dolores a officia veritatis autem corrupti vero aperiam. Neque, ratione quae.</p>
				<p>Horch! Wildfang und Muckefuck dengeln altbacken Sättigungsbeilage. Gemächt und Jubelperser picheln hurtig Kleintierzuchtverein. Der garstig Tohuwabohu. Das kess Übeltäter. Das hochgestochen Haubitze. Der gemach Rädelsführer. Rostbratwurst und Missetäter stibitzen piesacken Missetäter. Die fatal Gemächt auftakeln. Die Schindluder meucheln das hanebüchen Dänenfilm. Der blümerant Scharmützel berappen. Kaffeekränzchen und Haudegen katzbuckeln frivol Falscher Hase. Der Schmock schlampampen das fidel Unsitte. Lecko mio!</p>
			</section>
			<form>
				<div>
					<TextInput controls={name} inputName={'name'} >
            Name:
					</TextInput>
				</div>
				{/* <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="" id="email" />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" name="date" id="date" />
        </div>
        <div>
          <label htmlFor="radio">Radio</label>
          <input type="radio" name="radio" id="radio" />
          <label htmlFor="check">Checkbox</label>
          <input type="checkbox" name="check" id="check" />
        </div> */}
				<button>Click It!</button>
				<button disabled={true}>Cannot Click It!</button>
			</form>
			<section>
				<ul>
					<li>item_1</li>
					<li>item_2</li>
					<li>item_3</li>
					<li>item_4</li>
				</ul>
			</section>
		</Layout>
	);
};

export default KitchenSink;