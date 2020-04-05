/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./DoneView.css";

export interface DoneViewProps {

}

export interface DoneViewState {

}

export class DoneView extends React.Component<DoneViewProps, DoneViewState> {

	public constructor(props: DoneViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"doneView"}>
			<div className={"container"}>
				<h2>Submitted!</h2>
				<p>Thank you for your submission! You will be receiving an email confirming that we've received your submission.</p>
				<p>Thank you for sharing your time and talents!</p>
			</div>
		</div>);

	}
}