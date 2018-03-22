// create statement reducer
export default function StatementReducer(state = { obj: {} }, action) {
	switch(action.type) {
		case 'INIT_STATEMENT': {
			return { data: action.payload }
		}
	}

	return state;
}