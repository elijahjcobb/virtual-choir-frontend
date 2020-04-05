/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./InstructionView.css";

export interface InstructionViewProps {
	onContinue: () => void;
}

export interface InstructionViewState {

}

export class InstructionView extends React.Component<InstructionViewProps, InstructionViewState> {

	public constructor(props: InstructionViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"instruction"}>
			<h1>Instructions</h1>
			<video controls={true} autoPlay={true} src={"./instructions.mp4"}/>
			<button onClick={this.props.onContinue}>Continue</button>
		</div>);

	}
}