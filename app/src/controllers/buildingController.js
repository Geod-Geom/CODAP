
r.define(["Api/util/lang",
		  "Api/util/string",
		  "Api/util/ajax",
		  "Api/components/promise",
		  "App/config/payloads",
		  "App/util/osmAuth",
		  "App/components/controller"],
    
	function (Lang,
			  String,
			  Ajax,
			  Promise,
			  Payloads,
			  OsmAuth,
			  Controller) {

		var buildingController = Lang.Declare("BuildingController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {			
				this.model = {
					Building : null,
					Active : false
				};
			},
			
			Clear: function() {
				this.model.Building = null;
				this.NotifyViewNewModel("Building");
			},
			
			GetTag : function(key) {
				var f = this.model.Building.feature;
				
				if (!f) return null;
				
				return f.getProperties()["tags"][key] || null;
			},
			
			HasTag : function(key) {
				var f = this.model.Building.feature;
				
				if (!f) return null;
				
				return f.getProperties()["tags"].hasOwnProperty(key);
			},
			
			GetAddress : function() {
				addr = [];
				
				if (this.HasTag("addr:housenumber")) addr.push(this.GetTag("addr:housenumber"));
				if (this.HasTag("addr:street")) addr.push(this.GetTag("addr:street"));
				if (this.HasTag("addr:city")) addr.push(this.GetTag("addr:city"));
				
				return addr.join(", ");
			},
			
			Save : function(data) {
				var pOut = new Promise();
				
				this.UpdateSelected(data);
				
				var p = OsmAuth.OpenChangeset()
				p.then(this.onChangeset_Opened.bind(this, pOut), this.onOSM_Error.bind(this, pOut));
				
				return pOut;
			},
			
			UpdateSelected : function(data) {
				var tags = this.model.Building.feature.getProperties().tags;
				
				for (var k in data) {
					if (data[k] != null) tags[k] = data[k];
				}
			},
			
			onChangeset_Opened : function(pOut, ev) {
				var p = OsmAuth.UploadChangeset(ev.changeset.id, this.model.Building.feature);
				
				p.then(this.onUpload_Success.bind(this, pOut), failure.bind(this));
				
				function failure(err) {
					var p = OsmAuth.CloseChangeset(ev.changeset.id);
					
					p.then(this.onOSM_Error.bind(this, pOut, err), this.onOSM_Error.bind(this, pOut, err));
				}
			},
			
			onUpload_Success : function(pOut, ev) {
				var p = OsmAuth.CloseChangeset(ev.changeset.id);
				
				p.then(this.onChangeset_Closed.bind(this, pOut), this.onOSM_Error.bind(this, pOut));
			},
			
			onChangeset_Closed : function(pOut, ev) {
				pOut.Resolve(ev);
			},
			
			onOSM_Error : function(pOut, error) {
				pOut.Reject(error);
				this.NotifyViewError(error);
			},
			
			Activate : function(ev) {
				this.model.Active = true;
				
				this.NotifyViewNewModel("Building");
			},
			
			Deactivate : function(ev) {
				this.model.Active = false;
				
				this.NotifyViewNewModel("Building");
			}
		})
		
		return buildingController;
	})