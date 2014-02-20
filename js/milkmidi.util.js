milkmidi = window.milkmidi || {};
(function(){
	var queryObject;
	function initQueryObject(){
		queryObject = {};
		var queryString = window.location.search.substring(1);
		var variableList = queryString.split("&");
		for(var i = 0; i < variableList.length; i++){
			var queryParam = variableList[i].split("=");
			queryObject[queryParam[0]] = queryParam[1];
		}
	}

	milkmidi.util = {
		echo:function (o/*Object*/)/*String*/{
			var s = "";
			for (var a in o) {
				if( o[a] instanceof Object ){
					s += "<li>" + a + " :" + echo( o[a] );
				}else{
					s += "<li>" + a + " = " + o[a];
				}
			}
			return s + "</ul>";
		},
		getQueryParam:function( name ){
			if (!queryObject) 
				initQueryObject();
			var queryParam = queryObject[ name ];
			if (queryParam == undefined) return "";
			return decodeURIComponent(queryParam);
		}
	}
		
})();