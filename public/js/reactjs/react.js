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

window.setIncentiveReact = function () {

	var APP2 = React.createClass({displayName: 'APP2',
		mixins: [React.addons.LinkedStateMixin],
		getRepeat: function () {
			return document.getElementById("theDatalist").value;
		},
		getCurrency: function () {
			return document.getElementById("theCurrencyList").value;
		},
		update: function (e) {
			e.preventDefault();
			var obj = {
				goal: String(parseInt(this.state.goal)),
				repeat: this.getRepeat(),
				amount: String(parseInt(this.state.amount)),
				currency: this.getCurrency(),
			};
			console.log(JSON.stringify(obj));
			window.createIncentive(obj);
		},
		getInitialState: function () {
			return {
				goal: "",
				repeat: "",
				amount: "",
				currency: "BTC"
			};
		},
		render: function () {
			return (
        React.createElement("form", {className: "myForm"}, 
            React.createElement("div", {className: "input-group row formRow"}, 
                React.createElement("input", {valueLink: this.linkState('goal'), type: "text", 
								 placeholder: "How many kms do you wanna run?", 
								 className: "form-control"}), 
								React.createElement("span", {className: "input-group-addon"}, "km")
            ), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("span", {className: "input-group-addon"}, "Period:"), 
								React.createElement("input", {list: "periods", name: "period", className: "form-control", 
								 id: "theDatalist", placeholder: "How long should one period be?"}), 
								React.createElement("datalist", {id: "periods"}, 
										React.createElement("option", {value: "weekly"}), 
										React.createElement("option", {value: "every_two_weeks"}), 
										React.createElement("option", {value: "monthly"}), 
										React.createElement("option", {value: "yearly"})
								)
						), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("input", {valueLink: this.linkState('amount'), type: "text", 
								 placeholder: "How many BitCoins do you want to commit?", 
								 className: "form-control"}), 
								React.createElement("span", {className: "input-group-addon"}, "BitCoins")
						), 
						React.createElement("div", {className: "input-group row formRow"}, 
								React.createElement("input", {list: "currencyList", name: "currencylst", className: "form-control", 
								id: "theCurrencyList", placeholder: "BitCoin or US Dollar?"}), 
								React.createElement("datalist", {id: "currencyList"}, 
										React.createElement("option", {value: "BTC"}), 
										React.createElement("option", {value: "USD"})
								), 
								React.createElement("span", {className: "input-group-addon"}, this.getCurrency())
						), 
						React.createElement("div", {className: "row formRow"}, 
							React.createElement("button", {className: "btn btn-success", onClick: this.update}, "Create Sentiment")
						)
        )
			);
		}
	});

	React.render(React.createElement(APP2, null), document.getElementById("create"));
};
