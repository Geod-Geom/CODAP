
r.define(["Api/util/lang",
		  "Api/util/string",
		  "Api/util/ajax",
		  "Api/components/promise",
		  "App/util/osmAuth",
		  "App/util/osm",
		  "App/components/controller"],
    
	function (Lang,
			  String,
			  Ajax,
			  Promise,
			  OsmAuth,
			  OsmH,
			  Controller) {

		var landuseController = Lang.Declare("LanduseController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {			
				this.model = {
					Landuse : null,
					Active : false
				};
			},
			
			GetTag : function(key) {
				if (!this.model.Landuse.feature) return null;
				
				return OsmH.Tag(this.model.Landuse.feature, key);
			},
			
			GetAddress : function() {
				if (!this.model.Landuse.feature) return null;
				
				return OsmH.Index.landuse.Label(this.model.Landuse.feature);
			},
			
			Save : function(data) {
				var pOut = new Promise();
				
				this.UpdateSelected(data);
				
				var p = OsmAuth.OpenChangeset()
				p.then(this.onChangeset_Opened.bind(this, pOut), this.onOSM_Error.bind(this, pOut));
				
				return pOut;
			},
			
			UpdateSelected : function(data) {
				var tags = this.model.Landuse.feature.getProperties().tags;
				
				for (var k in data) {
					if (data[k] != null) tags[k] = data[k];
				}
			},
			
			onChangeset_Opened : function(pOut, ev) {
				var p = OsmAuth.UploadLanduseModification(ev.changeset.id, this.model.Landuse.feature);
				
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
				
				this.NotifyViewNewModel("Landuse");
			},
			
			Deactivate : function(ev) {
				this.model.Active = false;
				
				this.NotifyViewNewModel("Landuse");
			}
		})
		
		return landuseController;
	})