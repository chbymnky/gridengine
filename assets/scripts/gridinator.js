$(document).ready(function(){
	$("#show-grid").show();
	if ($("#gridinator-error").children().size() == 1) {
		$("#gridinator-error").hide();
	}
	$("#non-js").hide();
	$("#popular-grids").show();
	$("#extras").show();
	$("#options input.text").numeric();
	$("#grid-colours").css("margin-top", "10px");
	$("#grid-colours input").hide();
	$("#grid-colours label").hide();
	$("#col-sizes").hide();
	
	if ($("#show-col-widths").attr("checked") == true) { showColumnWidths(); }
	
	/*
	if ($("#em").attr("checked") == true) {
		$("#body-font-size").show();
	} else {
		$("#body-font-size").hide();
	}
	*/
	
	$("#grid-colours li").each(function(){
		href = $(this).find("label").attr("for");
		$(this).append('<a href="#'+href+'" class="'+href+'">'+href+'</a>');
	});
	
	$(".text").keyup(function(){
		var columns = 1 * $("#columns").val();
		var columnWidth = 1 * $("#column-width").val();
		var columnMargin = 1 * $("#column-margin").val();
		var containerMargin = 1 * $("#container-margin").val();
		buildGrid(columns, columnWidth, columnMargin, containerMargin);
	});
	

	
	$("#show-grid a").click(function(){
		if ($("#inner-wrapper").css("background-image") == "none") {
		  $("#show-grid a").html("hide grid");
		  $(".inner-wrapper").each(function(){
		  	if ($(this).attr("id") == "builder-inner-wrapper") {} else {
		  		$(this).css("background", "url(images/bluegrid.png) repeat-y 0 0");
		  	}
		  });
		} else {
		  $("#show-grid a").html("show grid");
		  	$(".inner-wrapper").each(function(){
		  	if ($(this).attr("id") == "builder-inner-wrapper") {} else {
		  		$(this).css("background", "");
		  	}
		  });
		}
		return false;
	});
	
	$("#grid-970-16 a").click(function(){
		$("#columns").val("16");
		$("#column-width").val("50");
		$("#column-margin").val("10");
		$("#container-margin").val("10");
		$(".text").trigger("keyup");
		return false;
	});
	
	$("#grid-980-12 a").click(function(){
		$("#columns").val("12");
		$("#column-width").val("60");
		$("#column-margin").val("20");
		$("#container-margin").val("20");
		$(".text").trigger("keyup");
		return false;
	});
	
	$("#grid-970-12 a").click(function(){
		$("#columns").val("12");
		$("#column-width").val("70");
		$("#column-margin").val("10");
		$("#container-margin").val("10");
		$(".text").trigger("keyup");
		return false;
	});
	

	
	$("#grid-colours a").click(function(){
		colour = $(this).attr("href");
		$(colour).attr("checked", "checked");
		gridColour = $(this).attr("class");
		setGridColour(gridColour);
		return false;
	});
	
	$("#em").click(function(){ $('input[name=measurement]').trigger("change"); });
	$("#pixel").click(function(){ $('input[name=measurement]').trigger("change"); });
	$("#percentage").click(function(){ $('input[name=measurement]').trigger("change"); });
	
	$('input[name=measurement]').change(function(){
	/*
		if ($("#em").attr("checked") == true) {
			$("#body-font-size").show();
		} else {
			$("#body-font-size").hide();
		}		
	*/
		var columns = 1 * $("#columns").val();
		var columnWidth = 1 * $("#column-width").val();
		var columnMargin = 1 * $("#column-margin").val();
		var containerMargin = 1 * $("#container-margin").val();
		buildGrid(columns, columnWidth, columnMargin, containerMargin);
	});
	
	
	$("#show-col-widths").click(function(){
		showColumnWidths();
	});
	
	$(".text").trigger("keyup"); // Trigger a keyup on page load.
	setGridColour("blue-grid");
	
});

function pxToEm(width, fontSize) {
	number = (1 / fontSize) * width;
	//return (Math.floor(number * 1000) / 1000);
	return (number).toFixed(3);
}

function showColumnWidths() {
	if ($("#col-sizes:visible").length > 0) {
		$("#col-sizes").hide();
	} else {
		$("#col-sizes").show();
	}
	$(".text").trigger("keyup");
}

function buildGrid(columns, columnWidth, columnMargin, containerMargin) {
	$("#grid").find("div").remove(); // Remove all the divs.
	$("#col-sizes").find("div").remove(); // Remove all divs.
	
	for (var count = 0; count < columns; count++){
	  $("#grid").append("<div class=\"column\"></div>");
	  $("#col-sizes").append("<div class=\"col\"><p></p></div>");
	}
	
	for (var count = 1; count == columns; count++){
		width = (count * columnWidth);
		$(this).css("width", width+"px");
	}

	counter = 1;
	$(".col").each(function(){
		width = (counter * columnWidth);
		if (counter > 1) { width = width + ((counter - 1) * columnMargin);}
		$(this).css("width", width+"px");
		$(this).find("p").html(width+"px");
		counter = counter + 1;
	});
	
	
	if ($("#em").attr("checked") == true) {
		fontSize = $("#font-size").val();
		
		if (fontSize != 0) {
			$("#grid-builder").css("font-size", fontSize+"px");
			$("#grid-builder p span").css("font-size", "14px");
			innerWidth = (columns * columnWidth) + ((columns-1) * columnMargin);
			containerWidth = innerWidth + (containerMargin *2);
			
			columnWidth = pxToEm(columnWidth, fontSize);
			columnMargin = pxToEm(columnMargin, fontSize);
			containerMargin = pxToEm(containerMargin, fontSize);
					
			emContainerWidth = pxToEm(containerWidth, fontSize);
			emInnerWidth = pxToEm(innerWidth, fontSize);
			
			innerWidth = (columns * columnWidth) + ((columns-1) * columnMargin);
			containerWidth = innerWidth + (containerMargin *2);
			
			innerWidth = innerWidth.toFixed(3);
			containerWidth = containerWidth.toFixed(3);
			//innerWidth = Math.ceil(innerWidth * 1000) / 1000;
			if (emInnerWidth > innerWidth) { innerWidth = emInnerWidth; }
			//containerWidth = Math.ceil(containerWidth * 1000) / 1000;
			if (emContainerWidth > containerWidth) { containerWidth = emContainerWidth; }
			
			counter = 1;
			$(".col").each(function(){
				width = (counter * columnWidth);
				if (counter > 1) { width = width + ((counter - 1) * columnMargin);}
				width = width.toFixed(3);
				$(this).find("p").html(width+"em");
				counter = counter + 1;
			});
			
		}
		
		if (columns == 0) {
			innerWidth = 0;
			containerWidth = innerWidth + (containerMargin * 2);
		}
		
		if (fontSize == 0) {
			innerWidth = 0;
			containerWidth = innerWidth + (containerMargin * 2);
			$(".column").css("width", "0").css("margin-right", "0");
		}
		
		$("#grid-builder .inner-wrapper").css("width", innerWidth+"em").css("margin-left", containerMargin+"em").css("margin-right", containerMargin+"em");
		$("#wrapper-width p").css("width", containerWidth+"em");
		$("#wrapper-width p span").html(containerWidth+"em");
		$("#inner-width p").css("width", innerWidth+"em");
		$("#inner-width p span").html(innerWidth+"em");
		
		$(".column").each(function(){
			$(this).css("width", columnWidth+"em").css("margin-right", columnMargin+"em");
		});
		$("#grid div:last-child").css("margin-right", "0");
		
	} else {
		$(".column").css("width", columnWidth+"px").css("margin-right", columnMargin+"px");
		$("#grid div:last-child").css("margin-right", "0");
		innerWidth = (columns * columnWidth) + ((columns-1) * columnMargin);
		containerWidth = innerWidth + (containerMargin *2);
		if (columns == 0) {
			innerWidth = 0;
			containerWidth = innerWidth + (containerMargin * 2);
		}
		
		$("#grid-builder .inner-wrapper").css("width", innerWidth+"px").css("margin-left", containerMargin+"px").css("margin-right", containerMargin+"px");
		$("#wrapper-width p").css("width", containerWidth+"px");
		$("#wrapper-width p span").html(containerWidth+"px");
		$("#inner-width p").css("width", innerWidth+"px");
		$("#inner-width p span").html(innerWidth+"px");
	}
	
		if ($("#percentage").attr("checked") == true) {
		counter = 1;
		containerWidth = (columns * columnWidth) + ((columns - 1) * columnMargin);
		$(".col").each(function(){
			width = (counter * columnWidth);
			if (counter > 1) { width = width + ((counter - 1) * columnMargin);}
			width = (width / containerWidth) * 100;
			width = (Math.floor(width * 1000) / 1000);
			$(this).find("p").html(width+"%");
			$(this).css("width", width+"%");
			counter = counter + 1;
		});
		
		columnWidth = (columnWidth / containerWidth) * 100;
		columnWidth = columnWidth.toFixed(3);
		columnMargin = (columnMargin / containerWidth) * 100;
		columnMargin = columnMargin.toFixed(3);
		$(".column").each(function(){
			$(this).css("width", columnWidth+"%").css("margin-right", columnMargin+"%");
		});
		$("#grid div:last-child").css("margin-right", "0");
		$("#wrapper-width p span").html("max-width: "+(containerWidth+(containerMargin*2))+"px");
		$("#inner-width p span").html("max-width: "+containerWidth+"px");
		}

	
	
	$(".column").height($("#col-sizes").height());
}

function setGridColour(gridColour) {
	$("body").removeClass("pink").removeClass("green");
	if (gridColour == "blue-grid") {
		$("#grid-colour").val("blue");
		$("#submit span").css("background-image", "url(/images/buttons/css-button-blue.png)");
		$("#submit-template span").css("background-image", "url(/images/buttons/html-button-blue.png)");
		$("#submit-image span").css("background-image", "url(/images/buttons/grid-button-blue.png)");
	}
	if (gridColour == "pink-grid") {
		$("body").addClass("pink");
		$("#grid-colour").val("pink");		
		$("#submit span").css("background-image", "url(/images/buttons/css-button-pink.png)");
		$("#submit-template span").css("background-image", "url(/images/buttons/html-button-pink.png)");
		$("#submit-image span").css("background-image", "url(/images/buttons/grid-button-pink.png)");
	}
	if (gridColour == "green-grid") {
		$("body").addClass("green");
		$("#grid-colour").val("green");
		$("#submit span").css("background-image", "url(/images/buttons/css-button-green.png)");
		$("#submit-template span").css("background-image", "url(/images/buttons/html-button-green.png)");
		$("#submit-image span").css("background-image", "url(/images/buttons/grid-button-green.png)");
	}
}





