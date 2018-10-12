$(document).ready(function() {
	changeItem(); // TODO DEL
/*	J_ToggleItems_click(); // TODO DEL
*/	changeSearchContent();
});

function changeSearchContent() {
	var searchRows = $("div .topSearch").find(".topSearch-row")
	searchRows
			.each(function(index) {
				$(this)
						.find("span:not('.search-title')")
						.each(
								function() {
									$(this)
											.click(
													function() {
														if (!$(this).hasClass(
																"active")) {
															$(this)
																	.parent()
																	.find(
																			"span:not('.search-title')")
																	.removeClass(
																			"active");
															$(this).addClass(
																	"active");
															if ($(this).text() == "全部") {
																$(
																		"label[name='searchLable_"
																				+ index
																				+ "']")
																		.remove();
																return true;
															}
															if ($("label[name='searchLable_"
																	+ index
																	+ "']").length == 0) {
																var filterHtml = "<label class='unckeckLable' name='searchLable_"
																		+ index
																		+ "' style='margin-left:5px;'>"
																		+ "<span name='searchLableText_"
																		+ index
																		+ "'>"
																		+ $(
																				this)
																				.text()
																		+ "</span>"
																		+ "<div style='cursor:pointer;' onclick='removeSearchLable(this, \""
																		+ index
																		+ "\")'>×</div>"
																		+ "</label>";
																$(
																		"div .search-check")
																		.append(
																				filterHtml);
															} else {
																$(
																		"span[name='searchLableText_"
																				+ index
																				+ "']")
																		.text(
																				$(
																						this)
																						.text());
															}
														}
													});
								});
			});
}

function removeSearchLable(obj, rowIndex) {
	$(obj).parent().remove();
	var searchRows = $("div .topSearch").find(".topSearch-row")
	searchRows.each(function(index) {
		if (index == rowIndex) {
			$(this).find("span:not('.search-title')").each(
					function(contentIndex) {
						if (contentIndex == 0)
							$(this).addClass("active");
						else
							$(this).removeClass("active");
					});
		}
	});
	research(rowIndex);
}

/*
 * 点击item事件 TODO DEL
 */
function changeItem() {
	var items = $("div[class='items']").find("a[class='item']");
	items.push($("div[class='items']").find("a[class='item item-active']"));
	items.each(function() {
		$(this).click(function() {
			$(this).parent().find("a").not(this).removeClass("item-active");
			$(this).addClass("item-active");
		});
	});
}

/*
 * 更多和收起按钮切换 TODO DEL
 */
function J_ToggleItems_click() {
	var J_ToggleItems = $("div[class='item-foot']").find("span");

	J_ToggleItems.each(function() {
		$(this).unbind("click");

		$(this).click(
				function() {

					$(this).addClass("hidden");
					// 判断是显示更多则显示滚动条
					if ($(this).hasClass("show-more")) {
						$(this).parent().parent().addClass("expand-all");
						$(this).parent().prev().height(
								$(this).parent().prev().children()
										.attr("super"));
						$(this).parent().prev().children().height(
								$(this).parent().prev().children()
										.attr("super"));
						// $(this).parent().parent().find("div[class='items']").scrollTop(100);
						$(this).next().removeClass("hidden");
					} else {

						$(this).parent().prev().height(36);
						$(this).parent().prev().children().height(36);
						// $(this).parent().prev().children().children().height(36);
						$(this).parent().parent().removeClass("expand-all");
						$(this).parent().parent().find("div[class='items']")
								.scrollTop(0);
						$(this).prev().removeClass("hidden");
					}
				});
		
		var divHeight = $(this).parent().prev().children().children().height();
		if (divHeight != "36" && divHeight != "40" && divHeight != "0") {
			$(this).parent().prev().children().attr("super", divHeight);
			$(this).parent().prev().height(36);
			$(this).parent().prev().children().height(36);
			$(this).parent().show();

		} else {
			if($(this).text()=="更多"){
				$(this).parent().hide();
				
			}
			if ($(this).parent().prev().children().attr("super") == null
					|| $(this).parent().prev().children().attr("super") == "") {

				$(this).parent().hide();

			}

		}
	})
}