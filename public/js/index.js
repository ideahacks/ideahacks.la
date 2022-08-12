$(() => {
	let scheduleResize = function () {
		if (window.outerWidth <= 990) {
			$(".schedule-time").removeClass("col-xs-3")
			$(".schedule-time").removeClass("text-center")
			$(".schedule-time").addClass("text-right")
			$(".schedule-time").addClass("col-xs-6")
			$(".event").removeClass("col-xs-4")
			$(".event").addClass("col-xs-6")
		} else {
			$(".schedule-time").addClass("col-xs-3")
			$(".schedule-time").addClass("text-center")
			$(".schedule-time").removeClass("text-right")
			$(".schedule-time").removeClass("col-xs-6")
			$(".event").addClass("col-xs-4")
			$(".event").removeClass("col-xs-6")
		}
	}
	$(window).resize(scheduleResize)
	// Call resize function to catch loading into a resized window
	scheduleResize()
})
