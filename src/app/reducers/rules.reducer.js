// create rules reducer
export default function RulesReducer(state = { data: [], executed: false }, action) {
	switch(action.type) {
		case 'GET_RULES': {
			return {
				...state,
				data: [
					{
						"id": 0,
						"title": "true statement",
						"body": "return !!arguments",
						"true_id": 1,
						"false_id": null,
						"executed": false,
						"isTrue": null
					},
					{
						"id": 1,
						"title": "increment",
						"body": "return (arguments[0].x += arguments[0].y)? true : false",
						"true_id": 2,
						"false_id": 0,
						"executed": false,
						"isTrue": null
					},
					{
						"id": 2,
						"title": "substract",
						"body": "return (arguments[0].x -= arguments[0].y)? true : false",
						"true_id": 3,
						"false_id": 1,
						"executed": false,
						"isTrue": null
					},
					{
						"id": 3,
						"title": "multiplier",
						"body": "return (arguments[0].x *= arguments[0].y)? true : false",
						"true_id": 4,
						"false_id": 6,
						"executed": false,
						"isTrue": null
					},
					{
						"id": 4,
						"title": "y is an odd number",
						"body": "return (arguments[0].y % 2) === 0",
						"true_id": null,
						"false_id": 5,
						"executed": false,
						"isTrue": null
					},
					{
						"id": 5,
						"title": "x is a decimal number",
						"body": "return (arguments[0].x % 1) !== 0",
						"true_id": null,
						"false_id": 3,
						"executed": false,
						"isTrue": null
					}
				]
			}
		}

		case 'SET_RULES': {
			return { ...state, data: action.payload, executed: true }
		}
	}

	return state;
}