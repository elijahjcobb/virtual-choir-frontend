/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./App.css";
import {IntroView, IntroViewResponse} from "./pages/intro/IntroView";
import {LoadingView} from "./pages/loading/LoadingView";
import {SubmissionFormResponse, SubmissionFormView} from "./pages/submission/SubmissionFormView";
import {EmailVerificationView, EmailVerificationViewResponse} from "./pages/verification/EmailVerificationView";
import {API, APIRecording} from "./API";
import {RecordingView, RecordingViewResponse} from "./pages/recording/RecordingView";
import {VideoUploader} from "./VideoUploader";
import {DoneView} from "./pages/done/DoneView";
import {HelloView} from "./pages/hello/HelloView";
import {InstructionView} from "./pages/instruction/InstructionView";

export interface AppProps {

}

export interface AppState {
	page: React.ReactElement;
	introResponse?: IntroViewResponse;
	formResponse?: SubmissionFormResponse;
	verificationResponse?: EmailVerificationViewResponse;
	recordingInfo?: APIRecording;
}

export class App extends React.Component<AppProps, AppState> {

	public constructor(props: AppProps) {

		super(props);

		this.handleRecordingKeyProvided = this.handleRecordingKeyProvided.bind(this);
		this.goToLoadView = this.goToLoadView.bind(this);
		this.handleSubmissionFormDone = this.handleSubmissionFormDone.bind(this);
		this.handleVerificationDone = this.handleVerificationDone.bind(this);
		this.handleRecordingDone = this.handleRecordingDone.bind(this);
		this.goToInstructionsView = this.goToInstructionsView.bind(this);
		this.goToRecordingKeyPage = this.goToRecordingKeyPage.bind(this);

		this.state = {
			page: <HelloView onContinue={this.goToInstructionsView} />
		};

	}

	private goToRecordingKeyPage(): void {
		this.setState({
			page: <IntroView onRecordingKeyProvided={this.handleRecordingKeyProvided}/>
		})
	}

	private goToInstructionsView(): void {
		this.setState({
			page: <InstructionView onContinue={this.goToRecordingKeyPage}/>
		});
	}

	private goToLoadView(message?: string): void {

		this.setState({page: <LoadingView message={message}/>})

	}

	private handleRecordingDone(response: RecordingViewResponse): void {
		(async (): Promise<void> => {

			this.goToLoadView("Uploading Video");
			await VideoUploader.upload(response.recording, response.submissionId);
			this.setState({page: <DoneView/>});

		})().catch((err: any) => console.error(err));
	}

	private handleVerificationDone(response?: EmailVerificationViewResponse): void {
		(async (): Promise<void> => {

			if (response === undefined) throw new Error("VerificationDone passed is undefined.");
			if (this.state.formResponse?.part === undefined) throw new Error("Part id is undefined.");
			this.setState({verificationResponse: response});
			this.goToLoadView("Sending Verification Code");

			try {
				await API.finishSubmission(response.submissionId, response.verification);
			} catch (e) {

				alert("The verification key you provided is not correct. Please try again.");
				this.setState({
					page: <EmailVerificationView submissionId={response?.submissionId} onBack={() => this.handleRecordingKeyProvided(this.state.introResponse)} email={this.state.formResponse?.email} onDone={this.handleVerificationDone}/>
				});
				return;

			}

			this.setState({
				page: <RecordingView partId={this.state.formResponse?.part} submissionId={response?.submissionId} onVideoRecorded={this.handleRecordingDone}/>
			});

		})().catch((err: any) => console.error(err));
	}

	private handleSubmissionFormDone(response?: SubmissionFormResponse): void {
		(async (): Promise<void> => {

			if (response === undefined) throw new Error("SubmissionFormResponse passed is undefined.");
			this.setState({formResponse: response});
			this.goToLoadView("Sending Verification Code");
			const submissionId: string = await API.startSubmission(response);
			this.setState({
				page: <EmailVerificationView submissionId={submissionId} onBack={() => this.handleRecordingKeyProvided(this.state.introResponse)} email={response.email} onDone={this.handleVerificationDone}/>
			});

		})().catch((err: any) => console.error(err));
	}

	private handleRecordingKeyProvided(response?: IntroViewResponse): void {
		(async (): Promise<void> => {

			this.setState({introResponse: response});
			this.goToLoadView("Gathering Information");

			let recordingInfo: APIRecording;

			try {
				recordingInfo = await API.getRecording(response?.recordingKey ?? "");
			} catch (e) {
				alert("The recording key you tried does not exist. Please try again.");
				this.setState({
					page: <IntroView onRecordingKeyProvided={this.handleRecordingKeyProvided}/>
				});
				return;
			}

			this.setState({
				recordingInfo,
				page: <SubmissionFormView recording={recordingInfo} onDone={this.handleSubmissionFormDone}/>
			})


		})().catch((err: any) => console.error(err));
	}

	public render(): React.ReactElement {

		return (<div className="main">{this.state.page}</div>);

	}
}