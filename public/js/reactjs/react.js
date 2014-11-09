/*** @jsx React.DOM */

window.renderIncentiveReact = function(incentive) {

	var APP = React.createClass({displayName: 'APP',
		getDefaultProps: function() {
			return {
					km: incentive.goal,
					create: incentive.create_date,
					expire: incentive.expire_date,
					amount: incentive.amount
				};
		},
		getInitialState: function () {
			return {
				percent: "Calculating..."
			};
		},
		render: function () {
			return (
				React.createElement("div", null, 
					React.createElement("div", {className: "row page-header thin"}, 
						"Your Goal: Run ", this.props.km, " km in ", this.props.days, " days"
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
			);
		}
	});

	React.render(React.createElement(APP, null), document.getElementById("dashboard"));

};

window.setIncentiveReact = function (id) {

	var APP2 = React.createClass({displayName: 'APP2',
		mixins: [React.addons.LinkedStateMixin],
		getLength: function () {
			var value = document.getElementById("theDatalist").value;
			if (value === "Week") {
				return 7;
			} else if (value === "Two Weeks") {
				return 14;
			} else if (value === "Month") {
				return 30;
			} else {
				return undefined;
			}
		},
		update: function (e) {
			e.preventDefault();
			var obj = {
				km: String(parseInt(this.state.km)),
				length: String(parseInt(this.getLength())),
				amount: String(parseInt(this.state.amount)),
				id: String(id),
			};
			console.log(JSON.stringify(obj));
		},
		getInitialState: function () {
			return {
				km: 0,
				length: 7,
				amount: 0
			};
		},
		render: function () {
			return (
        React.createElement("form", {className: "myForm"}, 
            React.createElement("div", {className: "input-group row"}, 
                React.createElement("input", {valueLink: this.linkState('km'), type: "text", 
								 placeholder: "How many kms do you wanna run?", 
								 className: "form-control"}), 
								React.createElement("span", {className: "input-group-addon"}, "km")
            ), 
						React.createElement("div", {className: "input-group row"}, 
								React.createElement("span", {className: "input-group-addon"}, "Period:"), 
								React.createElement("input", {list: "periods", name: "period", className: "form-control", id: "theDatalist"}), 
								React.createElement("datalist", {id: "periods"}, 
										React.createElement("option", {value: "Week"}), 
										React.createElement("option", {value: "Two Weeks"}), 
										React.createElement("option", {value: "Month"})
								)
						), 
						React.createElement("div", {className: "input-group row"}, 
								React.createElement("input", {valueLink: this.linkState('amount'), type: "text", 
								 placeholder: "How many BitCoins do you want to commit?"}), 
								React.createElement("span", {className: "input-group-addon"}, "BitCoins")
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("button", {className: "btn btn-success", onClick: this.update}, "Create Sentiment")
						)
        )
			);
		}
	});

	React.render(React.createElement(APP2, null), document.getElementById("create"));
};
