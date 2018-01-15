
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building",
          "Api/plugins/domain!App/config/dom_use",		  
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Access,
			  Dom_Building,
			  Dom_Use,
			  InfoWidget) {

		var buildingInfo = Lang.Declare("BuildingInfo", [InfoWidget], { 
				
			Build : function(domNode) {
				
				var wdgt = {};
				
				wdgt.LblAddress = this.AddLabel("Address", Lang.Nls("Building_LabelAddress"));
				wdgt.IptStreet = this.AddInput("addr:street", "Street", Lang.Nls("Building_PH_Street"));
				
				var row1 = this.AddRow(); 
				
				var gutter1 = this.AddGutter(row1);
				wdgt.IptNumber = this.AddInput("addr:housenumber", "Number", Lang.Nls("Building_PH_Number"), gutter1);
				
				var gutter2 = this.AddGutter(row1);
				wdgt.IptPostal = this.AddInput("addr:postcode", "Postal", Lang.Nls("Building_PH_Postal"), gutter2);
				
				wdgt.LblAccessibility = this.AddLabel("Accessibility", Lang.Nls("Building_LabelAccessibility"));
				wdgt.CbxAccessibility = this.AddCombox("accessibility", "Accessibility", Dom_Access);
				wdgt.LblAccess = this.AddLabel("Accessible", Lang.Nls("Building_LabelAccess"));
				wdgt.CbxAccess = this.AddCombox("wheelchair", "Access", Dom_Access);
				
				wdgt.LblBuilding = this.AddLabel("Use Restrictions", Lang.Nls("Building_LabelUse"));
				wdgt.LblBuilding = this.AddCombox("use", "Use", Dom_Use); 
				
				wdgt.LblBuilding = this.AddLabel("Effective Use", Lang.Nls("Building_LabelEffectiveUse"));
				wdgt.CbxBuilding = this.AddCombox("building", "Building", Dom_Building);
				
				wdgt.IptDescr = this.AddInput("note", "Description", Lang.Nls("Building_PH_Descr"));
				
				return wdgt;
			}
		})
		
		return buildingInfo;
	})