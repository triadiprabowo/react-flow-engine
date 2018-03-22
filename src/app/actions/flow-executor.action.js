function executor(rules, data, index) {
	// check type of rules
	if(typeof rules[index] != 'object') {
		return;
	}

	// check if flow has been executed
	// prevent loop forever
	if(rules[index].executed) {
		console.log(`Flow has been ended/executed more than once! ID(${rules[index].id})`);
		return;
	}

	// preparing execute
	const runner = new Function(rules[index].body);	
	const result = runner(data);

	// mark executed
	rules[index].executed = true;
	rules[index].isTrue = result;

	// validating execution
	if(result) {
		if(!rules[index].true_id) return rules;

		const nextIndex = rules[index].true_id;
		executor(rules, data, nextIndex);
	}
	else {
		if(!rules[index].false_id) return rules;

		const prevIndex = rules[index].false_id;
		executor(rules, data, prevIndex);
	}

	return rules;
}

function getRules() {
	return (dispatch) => {
		dispatch({ type: 'GET_RULES' });
	}
}

function run(rules, data) {
	const exect = executor(rules, data, 0);

	if(!exect) {
		console.log('Terminated!');
		return;
	}

	return (dispatch) => {
		dispatch({ type: 'SET_RULES', payload: exect });
	}
}

export default { run, getRules };