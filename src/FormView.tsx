/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./FormView.css";

export interface FormViewProps {

}

export interface FormViewState {

}

export class FormView extends React.Component<FormViewProps, FormViewState> {

	public constructor(props: FormViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"form"}>
			<select>
				<option value="-">Select Part</option>
				<option value="s1">Soprano 1</option>
				<option value="s2">Soprano 2</option>
				<option value="a1">Alto 1</option>
				<option value="a2">Alto 2</option>
				<option value="t1">Tenor 1</option>
				<option value="t2">Tenor 2</option>
				<option value="baritone">Baritone</option>
				<option value="bass">Bass</option>
				<option value="piano">Piano</option>
				<option value="flute">Flute</option>
				<option value="oboe">Oboe</option>
				<option value="clarinet">Clarinet</option>
				<option value="horn">Horn</option>
				<option value="violin1">Violin 1</option>
				<option value="violin2">Violin 2</option>
				<option value="viola">Viola</option>
				<option value="cello">Cello</option>
				<option value="contrabass">Contrabass</option>
				<option value="piano">Piano</option>
			</select>
			<input placeholder="First Name" type="text"/>
			<input placeholder="Last Name" type="text"/>
			<input placeholder="Email" type="email"/>
			<input placeholder="Code" type="text"/>
			<button className={"submitButton"}>Submit Recording</button>
		</div>);

	}
}