/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./EmailVerificationView.css";

export interface EmailVerificationViewResponse {
	verification: string;
	submissionId: string;
}

export interface EmailVerificationViewProps {
	email: string;
	onDone: (response: EmailVerificationViewResponse) => void;
	onBack: () => void;
	submissionId: string;
}

export interface EmailVerificationViewState {
	canContinue: boolean;
	verification: string;
}

export class EmailVerificationView extends React.Component<EmailVerificationViewProps, EmailVerificationViewState> {

	public constructor(props: EmailVerificationViewProps) {

		super(props);

		this.handleCodeChanged = this.handleCodeChanged.bind(this);
		this.handleContinueButtonClicked = this.handleContinueButtonClicked.bind(this);

		this.state = {
			canContinue: false,
			verification: ""
		};

	}

	private handleContinueButtonClicked(): void {

		this.props.onDone({verification: this.state.verification, submissionId: this.props.submissionId});

	}

	private handleCodeChanged(event: React.ChangeEvent<HTMLInputElement>): void {

		const value: string = event.target.value;
		this.setState({verification: value, canContinue: value.length > 0});

	}

	public render(): React.ReactElement {

		return (<div className={"verification"}>
			<div className={"form"}>
				<h1>NMC Virtual Choir</h1>
				<h2>Enter Verification Code</h2>
				<p>We sent a verification code to {this.props.email}. Please check your email.</p>
				<input onChange={this.handleCodeChanged} placeholder="Verification Code" type="text" value={this.state.verification}/>
				<div className="buttons">
					<button onClick={this.props.onBack} className={"backButton"}>Back</button>
					<button className={"submitButton"} onClick={this.handleContinueButtonClicked} disabled={!this.state.canContinue} style={{color: this.state.canContinue ? "#008265": "darkgray", background:  this.state.canContinue ? "white": "gray"}}>Continue</button>
				</div>
			</div>
		</div>);

	}
}