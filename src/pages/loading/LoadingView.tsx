/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./LoadingView.css";
import {IonIcon} from "../../IonIcon";

export interface LoadingViewProps {
	message?: string;
}

export interface LoadingViewState {

}

export class LoadingView extends React.Component<LoadingViewProps, LoadingViewState> {

	public constructor(props: LoadingViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className="loading">
			<IonIcon name={"sync"}/>
			{this.props.message !== undefined ? <span>{this.props.message}</span> : null}
		</div>);

	}
}