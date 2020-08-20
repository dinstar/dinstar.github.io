var app;

(function (app)
{
	var ecl = qrcodegen.QrCode.Ecc.HIGH,
		minVer = 1,
		maxVer = 40,
		mask = -1,
		boostEcc = true,
		scale = 8,
		border = 4,
		defaultText;

    function initialize()
	{
		bindEvents();
        redrawAllQrCodes();
    }

	function bindEvents()
	{
        var elems = document.querySelectorAll("input[type=number], textarea");

        for (var i = 0; i < elems.length; i++)
            if (elems[i].id.indexOf("version-") != 0)
                elems[i].oninput = redrawAllQrCodes;

        var elems = document.querySelectorAll("input[type=radio], input[type=checkbox]");

        for (var i = 0; i < elems.length; i++)
            elems[i].onchange = redrawAllQrCodes;
	}

    function redrawAllQrCodes()
	{
        // Reset output images in case of early termination
        defaultText = document.getElementById("text-input").value;
		var canvasAr = document.querySelectorAll(".qrcode-canvas");
		for (var i = 0; i < canvasAr.length; i++)
		{
			var text = canvasAr[i].getAttribute('text');
			drawQrCode(canvasAr[i], text);
			canvasAr[i].style.removeProperty("display");
		}
	}

    function drawQrCode(canvas, text)
	{
		var segs = qrcodegen.QrSegment.makeSegments(text || defaultText);
		var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
		qr.drawCanvas(scale, border, canvas);
    }

    initialize();

})(app || (app = {}));
