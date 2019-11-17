(function() {
	"use strict";
	/*global jQuery, OData, sap, setTimeout, hasher */
	sap.ui.getCore().loadLibrary("sap.m");
	jQuery.sap.require("sap.ui.core.IconPool");
	jQuery.sap.require("sap.ui.thirdparty.datajs");
	jQuery.sap.require("sap.ushell.components.tiles.utils");
	jQuery.sap.require("sap.ushell.components.tiles.utilsRT");

	sap.ui.controller("view.CustomTile", {
		onSearch: function() {
			var input = this.getView().byId("huInput");
			if(input){
				input.setValue("");
			}
			this.getView().byId("huNumber").getText() ? this._navigateToApp() : this._openInputDialog();
		},
		_navigateToApp: function() {
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "gqs_ri",
					action: "display"
				},
				params: {
					huNumber: this.getView().byId("huInput").getValue()
				}
			})) || "";
			oCrossAppNavigator.toExternal({
				target: {
					shellHash: hash
				}
			});

		},
		_openInputDialog: function() {
			var oView = this.getView();
			if (!this.byId("inputDialog")) {
				sap.ui.core.Fragment.load({
					id: oView.getId(),
					name: "view.InputDialog",
					controller: this
				}).then(function(oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});

			} else {
				this.byId("inputDialog").open();
			}
		},
		onCloseDialog: function() {
			this.byId("inputDialog").close();
			var huNumber = this.getView().byId("huInput");
			if (huNumber) {
				this._navigateToApp();
			}
		}
	});
}());