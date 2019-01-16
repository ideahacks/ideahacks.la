$(() => {
	var win = $(window) //this = window
	$(window).resize(function() {
		if (win.width() <= 990) {
			$(".schedule-time").addClass("col-xs-offset-2")
			$(".schedule-time").removeClass("col-xs-4")
			$(".schedule-time").removeClass("text-center")
			$(".schedule-time").addClass("text-right")
			$(".schedule-time").addClass("col-xs-5")
			$(".event").removeClass("col-xs-4")
			$(".event").addClass("col-xs-5")
		} else {
			$(".schedule-time").removeClass("col-xs-offset-2")
			$(".schedule-time").addClass("col-xs-4")
			$(".schedule-time").addClass("text-center")
			$(".schedule-time").removeClass("text-right")
			$(".schedule-time").removeClass("col-xs-5")
			$(".event").addClass("col-xs-4")
			$(".event").removeClass("col-xs-5")
		}
	})
	if (win.width() <= 990) {
		$(".schedule-time").addClass("col-xs-offset-2")
		$(".schedule-time").removeClass("col-xs-4")
		$(".schedule-time").removeClass("text-center")
		$(".schedule-time").addClass("text-right")
		$(".schedule-time").addClass("col-xs-5")
		$(".event").removeClass("col-xs-4")
		$(".event").addClass("col-xs-5")
	} else {
		$(".schedule-time").removeClass("col-xs-offset-2")
		$(".schedule-time").addClass("col-xs-4")
		$(".schedule-time").addClass("text-center")
		$(".schedule-time").removeClass("text-right")
		$(".schedule-time").removeClass("col-xs-5")
		$(".event").addClass("col-xs-4")
		$(".event").removeClass("col-xs-5")
	}
})
