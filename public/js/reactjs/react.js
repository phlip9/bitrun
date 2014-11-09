/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({displayName: 'APP',
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
				React.createElement("div", null,
					React.createElement("div", {className: "row page-header thin"},
						"Your Goal: Run ", this.props.miles, " Miles in ", this.props.days, " days"
					),
					React.createElement("div", {className: "row"},
						React.createElement("div", {className: "col-md-6"},
							React.createElement("div", {className: "row"}, "Created On: ", this.props.create),
							React.createElement("div", {className: "row"}, "Expires On: ", this.props.expire),
							React.createElement("div", {className: "row"}, "Bitcoins Bid: ", this.props.amount),
							React.createElement("div", {className: "row"}, "Percent Done: ", this.state.percent)
						),
						React.createElement("div", {className: "col-md-6"},
							React.createElement("div", null, "Analytics"),
							React.createElement("div", null, "This should be a D3 fancy graph"),
							React.createElement("button", {onClick: "createSocketConnection()"})
						)
					)
				)
			)
		}
	});

	React.renderComponent(React.createElement(APP, null), document.getElementById("dashboard"));

};

window.setIncentiveReact = function () {};
