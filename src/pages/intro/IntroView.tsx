/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./IntroView.css";

export interface IntroViewResponse {
	recordingKey: string;
}

export interface IntroViewProps {
	onRecordingKeyProvided: (response: IntroViewResponse) => void;
}

export interface IntroViewState {
	recordingKey: string;
}

export class IntroView extends React.Component<IntroViewProps, IntroViewState> {

	public constructor(props: IntroViewProps) {

		super(props);

		this.state = {
			recordingKey: ""
		};

		this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
		this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
		this.handleOnKeyChange = this.handleOnKeyChange.bind(this);

	}

	private handleOnKeyChange(event: React.ChangeEvent<HTMLInputElement>): void {

		this.setState({recordingKey: event.currentTarget.value});

	}

	private handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {

		if (event.keyCode === 13) this.handleStartButtonClick();

	}

	private handleStartButtonClick(): void {

		this.props.onRecordingKeyProvided({recordingKey: this.state.recordingKey});

	}

	public render(): React.ReactElement {

		return (<div className={"intro"}>
			<div className={"form"}>
				<p>Please enter the recording key that was provided to you:</p>
				<input onKeyDown={this.handleOnKeyDown} onChange={this.handleOnKeyChange} placeholder={"Recording Key"} value={this.state.recordingKey}/>
				<button onClick={this.handleStartButtonClick}>Continue</button>
			</div>
		</div>);

	}
}