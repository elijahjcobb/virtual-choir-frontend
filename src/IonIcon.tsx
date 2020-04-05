/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";

export interface IonIconProps {
	name: string;
}

export interface IonIconState {

}

export class IonIcon extends React.Component<IonIconProps, IonIconState> {

	public constructor(props: IonIconProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		// @ts-ignore
		return <ion-icon class={"ionIcon"} name={this.props.name}></ion-icon>

	}
}