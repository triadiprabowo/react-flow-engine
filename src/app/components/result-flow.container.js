import React, { Component } from 'react';

export default class ResultFlowContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.rules.executed) {
			return (
				<div>
					{ this.props.rules.data.map((item, index) => (
						<div className="card">
							<div className="card__container">
								<div className={item.isTrue? 'card__header has--success' : 'card__header has--error' }>
									<div className="col col--20 has--border-right">
										{item.id}
									</div>

									<div className="col col--80">
										{item.title}
									</div>
								</div>

								<div className="card__content">
									<div className="form__wrapper">
										<div className="form__group">
											<label>Rule Body</label>
											<input type="text" value={`function(obj) { ${item.body} }`} />
										</div>

										<div className="form__group">
											<div className="col col--50">
												<label>Next rule-id if passed</label>
												<input type="text" value={item.true_id} readonly />
											</div>

											<div className="col col--50">
												<label>Next rule-id if failed</label>
												<input type="text" value={item.false_id} readonly />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			);	
		}
		else {
			return ( <div></div> );
		}
	}
}