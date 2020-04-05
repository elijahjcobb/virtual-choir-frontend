/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./OptionsView.css"
import {FormView} from "./FormView";

export interface OptionsViewProps {

}

export interface OptionsViewState {

}

export class OptionsView extends React.Component<OptionsViewProps, OptionsViewState> {

	public constructor(props: OptionsViewProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className="options">
			<h1>Virtual Choir</h1>
			<h2>Northwestern Michigan College</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam risus, euismod ut consequat suscipit, luctus elementum turpis. Suspendisse feugiat quam eu interdum congue. Fusce odio nisi, sagittis ut nisl vitae, convallis viverra nulla. Proin luctus interdum enim, a facilisis est pretium ac. Fusce faucibus porttitor quam vel tristique. Donec varius justo metus, ac fermentum erat iaculis vel. Sed odio tellus, consequat in arcu fringilla, facilisis dignissim quam. Nunc tempus orci in velit placerat varius. Nunc et ullamcorper turpis. Morbi leo lacus, facilisis eget diam ut, ultrices tempus est. Donec commodo velit eu ante auctor, scelerisque luctus magna luctus. Aenean convallis ac mauris at rhoncus. Sed ac tincidunt justo. </p>
			<FormView/>
		</div>);

	}
}