
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building",
          "Api/plugins/domain!App/config/dom_use",
          "Api/plugins/domain!App/config/dom_landuse",			  
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Access,
			  Dom_Building,
			  Dom_Use,
			  Dom_Landuse,
			  InfoWidget) {

		var landuseInfo = Lang.Declare("LanduseInfo", [InfoWidget], { 
				
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
					
				wdgt.LblLanduse = this.AddLabel("Use Restrictions", Lang.Nls("Building_LabelUse"));
				wdgt.LblLanduse = this.AddCombox("use", "Use", Dom_Use); 
				
				wdgt.LblLanduse = this.AddLabel("Effective Use", Lang.Nls("Building_LabelEffectiveUse"));
				wdgt.CbxLanduse = this.AddCombox("landuse", "Landuse", Dom_Landuse);
				
				wdgt.IptDescr = this.AddInput("note", "Description", Lang.Nls("Building_PH_Descr"));
				
				return wdgt;
			}
		})
		
		return landuseInfo;
	})