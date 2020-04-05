/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./SubmissionFormView.css";
import {IonIcon} from "../../IonIcon";
import {APIRecording} from "../../API";

export interface SubmissionFormResponse {
	part: string,
	firstName: string,
	lastName: string,
	email: string,
	organization: string;
	recordingKey: string;
}

export interface SubmissionFormViewProps {
	onDone: (response: SubmissionFormResponse) => void;
	recording: APIRecording;
}

export interface SubmissionFormViewState {
	canContinue: boolean;
	part: string;
	firstName: string;
	lastName: string;
	email: string;
	organization: string;
	realOrganization: string;
}

export class SubmissionFormView extends React.Component<SubmissionFormViewProps, SubmissionFormViewState> {

	public constructor(props: SubmissionFormViewProps) {

		super(props);

		this.state = {
			canContinue: false,
			part: "-",
			firstName: "",
			lastName: "",
			email: "",
			organization: "-",
			realOrganization: "-"
		};

		this.onEmailChanged = this.onEmailChanged.bind(this);
		this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
		this.onLastNameChanged = this.onLastNameChanged.bind(this);
		this.onPartChanged = this.onPartChanged.bind(this);
		this.updateCanContinueState = this.updateCanContinueState.bind(this);
		this.onContinueButtonClicked = this.onContinueButtonClicked.bind(this);
		this.onOrganizationChanged = this.onOrganizationChanged.bind(this);

	}

	private updateCanContinueState(): void {

		this.setState({
			canContinue: (this.state.firstName.length > 0
				&& this.state.lastName.length > 0
				&& this.state.part !== "-"
				&& this.state.organization !== "-"
				&& this.state.email.length > 0
				&& this.state.email.indexOf("@") !== -1
				&& this.state.email.indexOf(".") !== -1)
		});

	}

	private onPartChanged(event: React.ChangeEvent<HTMLSelectElement>): void {

		this.setState({part: event.target.value}, this.updateCanContinueState);

	}

	private onOrganizationChanged(event: React.ChangeEvent<HTMLSelectElement>): void {

		const value: string = event.target.value;
		if (value === "other") {
			const realValue: string | null = prompt("Please enter your organization", "");
			this.setState({organization: "other", realOrganization: realValue ?? "other"}, this.updateCanContinueState);
		} else {
			this.setState({organization: value, realOrganization: value}, this.updateCanContinueState);
		}

	}

	private onFirstNameChanged(event: React.ChangeEvent<HTMLInputElement>): void {

		this.setState({firstName: event.target.value}, this.updateCanContinueState);

	}
	private onLastNameChanged(event: React.ChangeEvent<HTMLInputElement>): void {

		this.setState({lastName: event.target.value}, this.updateCanContinueState);

	}

	private onEmailChanged(event: React.ChangeEvent<HTMLInputElement>): void {

		this.setState({email: event.target.value}, this.updateCanContinueState);

	}

	private onContinueButtonClicked(): void {

		this.props.onDone({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			part: this.state.part,
			organization: this.state.realOrganization,
			recordingKey: this.props.recording.recording.key
		});

	}

	public render(): React.ReactElement {

		return (<div className={"submission"}>
			<form className={"form"}>
				<h1>NMC Virtual Choir</h1>
				<h2>{this.props.recording.recording.name}</h2>
				<div className={"elementContainer"}>
					<div className={"iconContainer"}><IonIcon name="musical-note"/></div>
					<select onChange={this.onPartChanged} value={this.state.part}>
						<option value="-">Select Part</option>
						{
							this.props.recording.parts.map((part) => {
								return <option key={part.id} value={part.id}>{part.name}</option>;
							})
						}
					</select>
				</div>
				<div className={"elementContainer"}>
					<div className={"iconContainer"}><IonIcon name="person"/></div>
					<div className={"name"}>
						<input className={"firstName"} value={this.state.firstName} onChange={this.onFirstNameChanged} placeholder="First Name" type="text"/>
						<input value={this.state.lastName} onChange={this.onLastNameChanged} placeholder="Last Name" type="text"/>
					</div>
				</div>
				<div className={"elementContainer"}>
					<div className={"iconContainer"}><IonIcon name="mail"/></div>
					<input value={this.state.email} onChange={this.onEmailChanged} placeholder="Email" type="email"/>
				</div>
				<div className={"elementContainer"}>
					<div className={"iconContainer"}><IonIcon name="business"/></div>
					<select onChange={this.onOrganizationChanged} value={this.state.organization}>
						<option value="-">Select Organization</option>
						<option value="chamber-singers">Chamber Singers</option>
						<option value={"grand-traverse-chorale"}>Grand Traverse Chorale</option>
						<option value={"canticum-novum"}>Canticum Novum</option>
						<option value={"nmc-childrens-choir"}>NMC Children's Choir</option>
						<option value={"nmc-faculty"}>NMC Faculty</option>
						<option value={"community-member"}>Community Member</option>
						<option value={"tc-central"}>Traverse City Central High School</option>
						<option value={"tc-west"}>Traverse City West Senior High</option>
						<option value={"benzie"}>Benzie Central High School</option>
						<option value={"elk-rapids"}>Elk Rapids High School</option>
						<option value={"forest-area"}>Forest Area High School</option>
						<option value={"gaylord"}>Gaylord High School</option>
						<option value={"glen-lake"}>Glen Lake High School</option>
						<option value={"grayling"}>Grayling High School</option>
						<option value={"gta"}>Grand Traverse Academy</option>
						<option value={"kingsley"}>Kingsley High School</option>
						<option value={"leland"}>Leland High School</option>
						<option value={"st-francis"}>St. Francis</option>
						<option value={"st-mary"}>St. Mary's Leelanau</option>
						<option value={"other"}>Other</option>
					</select>
				</div>
				<button onClick={this.onContinueButtonClicked} disabled={!this.state.canContinue} style={{color: this.state.canContinue ? "#008265": "darkgray", background:  this.state.canContinue ? "white": "gray"}}>Continue</button>
			</form>
		</div>);

	}
}