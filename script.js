window.addEventListener("load", function () {
	document.getElementById('capture').onchange = function (evt) {
		var tgt = evt.target || window.event.srcElement,
			files = tgt.files;
		if (FileReader && files && files.length) {
			var fr = new FileReader();
			fr.onload = function () {
				document.getElementById('predictedpicture').src = fr.result;
			}
			fr.readAsDataURL(files[0]);
		} else {}
	}
	button.addEventListener("click", function () {
		const file = document.getElementById('capture').files[0];
		console.log(file);
		var URL = "https://maskdetect199-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/4544565d-8952-4276-a439-6a70a842799d/classify/iterations/Iteration1/image";
		var xhr = new XMLHttpRequest();
		xhr.open('POST', URL, true);
		xhr.setRequestHeader('Prediction-Key', '9fc5e656859a4f5aa4882fa85337afda');
		xhr.setRequestHeader('Content-Type', 'application/octet-stream')
		xhr.send(file);
		xhr.onreadystatechange = processRequest;

		function processRequest(e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(typeof (xhr.responseText));
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				console.log(json.predictions[0]['probability']);
				console.log(typeof (json));
				var table = document.getElementById("myTable");
				for (var i = json.predictions.length - 1; i >= 0; i--) {
					var row = table.insertRow(1);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);

					cell1.innerHTML = json.predictions[i]['tagName'];
					cell2.innerHTML = json.predictions[i]['probability'] * 100 + '%';


				}
			}
		}
	}, false);

}, false);