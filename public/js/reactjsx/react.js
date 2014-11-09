/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({
		getDefaultProps: function() {
			return {
					miles: incentive.goal,
					create: incentive.create_date,
					expire: incentive.expire_date,
					amount: incentive.amount
				};
		},
		getInitialState: function () {
			return {
				percent: "Calculating..."
			}
		},
		render: function () {
			return (
				<div>
					<div className="row page-header thin">
						Your Goal: Run {this.props.miles} Miles in {this.props.days} days
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="row">Created On: {this.props.create}</div>
							<div className="row">Expires On: {this.props.expire}</div>
							<div className="row">Bitcoins Bid: {this.props.amount}</div>
							<div className="row">Percent Done: {this.state.percent}</div>
						</div>
						<div className="col-md-6">
							<div>Analytics</div>
							<div>This should be a D3 fancy graph</div>
							<button onClick="createSocketConnection()"></button>
						</div>
					</div>
				</div>
			)
		}
	});

	React.renderComponent(<APP />, document.getElementById("dashboard"));

};

window.setIncentiveReact = function () {};
