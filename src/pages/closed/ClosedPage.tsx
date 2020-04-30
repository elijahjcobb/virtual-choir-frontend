/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./ClosedPage.css";

export interface ClosedPageProps {

}

export interface ClosedPageState {

}

export class ClosedPage extends React.Component<ClosedPageProps, ClosedPageState> {

	public constructor(props: ClosedPageProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"closedPage"}>
			<div className={"container"}>
				<h1>NMC Virtual Choir</h1>
				<p>Thank you for your interest, we are not taking any submissions at this time.</p>
			</div>
		</div>);

	}
}