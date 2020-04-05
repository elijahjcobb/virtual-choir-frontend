/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./HelloView.css";

export interface HelloViewProps {
	onContinue: () => void;
}

export interface HelloViewState {

}

export class HelloView extends React.Component<HelloViewProps, HelloViewState> {

	public constructor(props: HelloViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"hello"}>
			<h1>NMC Virtual Choir</h1>
			<div className={"container"}>
				<img className={"left"} src={"./jeff.jpg"} alt={"jeff"}/>
				<div className={"right"}>
					<h2>A NOTE FROM JEFFREY COBB:</h2>
					<p>Greetings everyone! I hope this finds you well, and healthy!</p>
					<p>In these times of self-quarantining and social distancing, we need to find a way to connect. What better
						way to do that than through music? I wish we could all be together, and make music in person, but...
						since we can’t right now, how about connecting virtually?</p>
					<p>I would love to have you be a part of our inaugural NMC Virtual Choir. My goal is to have 100 people
						participate! (Please help spread the word to other folks connected to NMC.)</p>
					<p>The DEADLINE for submissions is <b>Thursday, April 9, at 5:00pm</b>. I hope to finish mixing and editing the
						video, and release it to the public by Monday, April 20.</p>
					<p>Thank you for lending your time and talents to this project!</p>
					<p>All my best...<br/>Jeff</p>
				</div>
			</div>
			<button onClick={this.props.onContinue}>Continue</button>
		</div>);

	}
}