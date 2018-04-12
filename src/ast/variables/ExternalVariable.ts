import Variable from './Variable';
import Identifier from '../nodes/Identifier';
import ExternalModule from '../../ExternalModule';

export function isExternalVariable(variable: Variable): variable is ExternalVariable {
	return variable.isExternal;
}

export default class ExternalVariable extends Variable {
	module: ExternalModule;
	isExternal: true;
	isNamespace: boolean;

	constructor(module: ExternalModule, name: string) {
		super(name);
		this.module = module;
		this.isNamespace = name === '*';
	}

	addReference(identifier: Identifier) {
		if (this.name === 'default' || this.name === '*') {
			(<ExternalModule>this.module).suggestName(identifier.name);
		}
	}

	include() {
		if (!this.included) {
			this.included = true;
			this.module.used = true;
		}
	}
}

ExternalVariable.prototype.isExternal = true;
