// 台灣縣市 select 用
// 奶綠茶
// 1.0.1
// 第四個參數改成要讀的路徑
/*
  var cityArea = new CityArea('city_select', 'area_select', "street_select", "xml/");
*/
CityArea = (function () {
    var DEBUG = false;
    function log() {
        if (!DEBUG)
            return;
        if (window.console)
            console.info('[CityArea] ' + Array.prototype.join.call(arguments, ', '));
    }
    function CityArea(cityId, areaId, streetId, sXmlPath) {
        this.cityId = cityId;
        this.areaId = areaId;
        this.streetId = streetId;
        var jCity = $("#" + cityId);
        var jArea = $("#" + areaId);
        var jStreet = $("#" + streetId);
        jCity.empty();
        jCity.append("<option value='-1'>請選擇</option>");
        jArea.empty();
        jArea.append("<option value='0'>請選擇</option>");
        jStreet.empty();
        jStreet.append("<option value='0'>請選擇</option>");
        var innerThis = this;
        this.xml = null;
		this.$city = jCity;
		this.$area = jArea;
		this.$street = jStreet;

        function clearAreaAndStreet() {
            jArea.empty();
            jArea.append("<option value='0'>請選擇</option>");
            jStreet.empty();
            jStreet.append("<option value='0'>請選擇</option>");
        }

        jCity.change(function (e) {
            clearAreaAndStreet();
            var index = jCity.val();
            if (index == -1) {
                return;
            }
            var citys = $(xml).find("twzip").find("city")[index];
            $(citys).find("area").each(function (i) {
                var name = $(this).attr("name");
                var zip = $(this).attr("zip");
                jArea.append("<option value='" + zip + "'>" + name + "</option>");
            });
        });
        jArea.change(function (e) {			
            jStreet.empty();			
            var fileName = innerThis.getZip() + "_" + innerThis.getCity() + "_" + innerThis.getArea() + ".txt";
            jStreet.empty();
            jStreet.append("<option value='0'>請選擇</option>");
            log(fileName);
			if(jArea.get(0).selectedIndex == 0){
				return;
			}
            $.ajax({
                type: "GET",
                url: sXmlPath+"streetName/" + fileName,
                success: function (response) {
                    if (!response) {
                        return;
                    }
                    var streetArr = response.split(",");
                    var length = streetArr.length;
                    for (var i = 0; i < length; i++) {
                        jStreet.append("<option value='" + i + "'>" + streetArr[i] + "</option>");
                    }
                }
            });
        });
        $.ajax({
            type: "GET",
            url: sXmlPath + "ZipCode.xml",
            dataType: 'xml',
            success: function (response) {
                if (response) {
                    xml = response;
                    $(xml).find("twzip").find("city").each(function (i) {
                        var label = $(this).attr("name");
                        jCity.append("<option value='" + i + "'>" + label + "</option>");
                    });
                }
            }
        });
    }
    CityArea.prototype.getCity = function () {
        return $("#" + this.cityId + " :selected").text();
    }
    CityArea.prototype.getArea = function () {
        return $("#" + this.areaId + " :selected").text();
    }
    CityArea.prototype.getZip = function () {
        return $("#" + this.areaId + " :selected").attr("value");
    }
    CityArea.prototype.getStreet = function () {
        return $("#" + this.streetId + " :selected").text();
    }   
    CityArea.prototype.getAddress = function (withZip) {
        var address = this.getCity() + this.getArea() + this.getStreet();
        return withZip ? this.getZip() + address : address;
    }
	CityArea.prototype.validate = function(){
		var cityIndex = this.$city.get(0).selectedIndex;
		var areaIndex = this.$area.get(0).selectedIndex;
		var streetIndex = this.$street.get(0).selectedIndex;
		return cityIndex != 0 && areaIndex != 0 && streetIndex !=0;
	}
    return CityArea;
})();
