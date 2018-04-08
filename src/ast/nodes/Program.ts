import MagicString from 'magic-string';
import { NodeBase, StatementNode } from './shared/Node';
import { NodeType } from './NodeType';
import { RenderOptions, renderStatementList } from '../../utils/renderHelpers';

export default class Program extends NodeBase {
	type: NodeType.Program;
	body: StatementNode[];

	include() {
		let anotherPassNeeded = false;
		this.included = true;
		for (const node of this.body) {
			if (node.shouldBeIncluded() && node.include()) {
				anotherPassNeeded = true;
			}
		}
		return anotherPassNeeded;
	}

	render(code: MagicString, options: RenderOptions) {
		if (this.body.length) {
			renderStatementList(this.body, code, this.start, this.end, options);
		} else {
			super.render(code, options);
		}
	}
}
