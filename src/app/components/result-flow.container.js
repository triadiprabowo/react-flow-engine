import React, { Component } from 'react';

export default class ResultFlowContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.rules.executed) {
			return (
				<div className="helper__card">
					{ this.props.rules.data.map((item, index) => (
						<div className="card" key={index}>
							<div className="card__container">
								<div className={item.isTrue? 'card__header has--success' : 'card__header has--error' }>
									<div class="row__wrapper">
										<div className="col col--5 has--border-right">
											<h4 className="title">{item.id}</h4>
										</div>

										<div className="col col--90">
											<h4 className="title">{item.title}</h4>
										</div>
									</div>

									<span className="cleargrid"></span>
								</div>

								<div className="card__content">
									<div className="form__wrapper">
										<div className="form__group">
											<label>Rule Body</label>
											<input class="form__control" type="text" value={`function(obj) { ${item.body} }`} />
										</div>

										<div className="form__group">
											<div class="row__wrapper">
												<div className="col col--50">
													<label>Next rule-id if passed</label>
													<input class="form__control" type="text" value={item.true_id? item.true_id : 'null'} readOnly="true" />
												</div>

												<div className="col col--50">
													<label>Next rule-id if failed</label>
													<input class="form__control" type="text" value={item.false_id? item.false_id : 'null'} readOnly="true" />
												</div>
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
			return ( <div className="helper__card"></div> );
		}
	}
}