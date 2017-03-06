var theABI, etherscanRequestPostfix, highestBlock, eventElementData, myLineChart, changedEvent, elementCounter, selectedEventID, contractAddress;
var watchID = getUrlParameter("watchID");

init();

if(watchID === undefined) {

	processABI();
	startWatching(3000000);
	setInterval(myTimer, 20000);
	
} else {
	var url = "http://1-dot-contracteventlistener.appspot.com/watchdata?watchID=" + watchID; 
	//$.getJSON(url, loadWatchEntity).fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); });
	
	
	$.ajax({
		url: url,
		type: "GET",	
	})
	.done(loadWatchEntity)
	.fail(function(jqxhr, textStatus, error){
		        var err = textStatus + ', ' + error; 
		        console.log("Request Failed: " + err);
	});
}

function startWatching(startBlock) {
	changedEvent = true;
	elementCounter = 0;
	if(myLineChart !== undefined) {
		myLineChart.destroy();
	}
	highestBlock = startBlock;
	eventElementData =[];
	$('#eventList').empty();
	createEtherscanRequestPostfix();
	sendRequest(highestBlock, "latest");
}

function sendRequest(fromBlock, toBlock) {
	
	var url = createEtherscanRequestPrefix(fromBlock, toBlock) + etherscanRequestPostfix; 
	$.getJSON(url, handleEtherscanData);
	
}

function loadWatchEntity(dataInput) {
	
	var data = JSON.parse(dataInput);
	
	$('#contractAddress').val(data.contractAddress);
	$("#abi").val(JSON.stringify(data.abi));
	theABI = data.abi;
	abiDecoder.addABI(theABI);
	listEventsFromABI(abiDecoder.getMethodIDs());
	$("#"+data.selectedEventID).prop("checked", true);
	startWatching(data.highestBlock);
	setInterval(myTimer, 20000);
	
}

function handleEtherscanData(data) {
	
	if(data.result && data.result && data.result.length > 0) {
		highestBlock = parseInt(data.result[data.result.length-1].blockNumber);
	
		var decodedData = abiDecoder.decodeLogs(data.result);
		

		var listElementsToAdd = decodedData
				.map(function(item, index) {
					var timeStamp = getDateString(parseInt(data.result[index].timeStamp));
					var listElement = '<a class="list-group-item list-group-item-success" data-toggle="collapse" href="#collapseEvent'
							+ elementCounter
							+ '" aria-expanded="false" aria-controls="collapseEvent"><h4 class="list-group-item-heading">'
							+ item.name
							+ '</h4><p class="list-group-item-text"><small>'
							+ timeStamp
							+ '</small><div class="collapse" id="collapseEvent'
							+ elementCounter + '"><br>';
					item.events.forEach(function(element) {
						if(eventElementData[element.name] === undefined) {
							eventElementData[element.name] = [];
						}
						eventElementData[element.name].push({
							"timeStamp" :  timeStamp,
							"value" : element.value
						});					
						
						listElement += '<p><span class="badge">' 
							+ element.name
							+ '</span><br>'
							+ '<span style="word-wrap:break-word;">'
							+ element.value + '</span></p>';
					});
					listElement += '</p></div></a>';
					elementCounter++;
					return listElement;
				});

		listElementsToAdd.forEach(function(element) {
			$('#eventList').prepend(element);
		});
		
		if(changedEvent) {
			changedEvent = false;
			$('#chartSelector').empty();
			$('#chartSelector').append('<option value="none">none</option>')
			for(name in eventElementData) {
				$('#chartSelector').append('<option value="'+name+'">'+name+'</option>');
			}
		}
		generateChart();
		
	}
	
}

function createEtherscanRequestPrefix(fromBlock, toBlock) {
	
	var url = "http://1-dot-contracteventlistener.appspot.com/etherscanproxy?"
		+ "fromBlock=" + fromBlock
		+ "&toBlock=" + toBlock;
	
	return url;
}

function createEtherscanRequestPostfix() {
	
	var url = "&address=" + $('#contractAddress').val()
	contractAddress = $('#contractAddress').val();
	
	var eventCounter = 0;
	var checkedElement = $('.eventCheckbox:checked').toArray();
	for( checkedElementIndex in checkedElement) {
		url += "&topic" + eventCounter + "=0x" + checkedElement[checkedElementIndex].id;
		selectedEventID = checkedElement[checkedElementIndex].id;
		eventCounter++;
		if(eventCounter>3) {
			break;
		}
		
	}
	
	etherscanRequestPostfix = url;

}

function myTimer() {
	$('#statusText').empty;
	$('#statusText').text("Watching for new events...");
	$('.list-group-item-success').removeClass('list-group-item-success');
	sendRequest(highestBlock+1, "latest");
}

function getDateString(timestamp) {
	var date = new Date(timestamp * 1000);
	return date;
}

function processABI() {
	theABI = JSON.parse($('#abi').val());
	abiDecoder.addABI(theABI);
	listEventsFromABI(abiDecoder.getMethodIDs());
}

function listEventsFromABI(methodIDs) {
	$('#eventCheckboxes').empty();
	var first = true;
	for ( var key in methodIDs) {
		if (methodIDs.hasOwnProperty(key) && methodIDs[key].type === "event") {
			var eventCheckbox = '<div class="checkbox"> <label>'
				+ '<input id="' + key+ '" name="eventSelector" class="eventCheckbox" type="radio" '+ (first?'checked':'') +'> '
				+ methodIDs[key].name + '</label></div>';
			$('#eventCheckboxes').append(eventCheckbox);
			first = false;

		}
	}
}

function generateChart() {
	var eventElementName = $('#chartSelector option:selected').val();
	if(myLineChart !== undefined) {
		myLineChart.destroy();
	}
	
	if(eventElementName !== "none") {
		var selectedLabels = [];
		var selectedDataset = [];
		
		var counter = 0;
		eventElementData[eventElementName].forEach(function (element) {
			//selectedLabels.push(element.timeStamp);
			selectedLabels.push(counter++)
			selectedDataset.push(element.value);
			
		});
		
		var ctx = document.getElementById("chart");
		myLineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: selectedLabels ,
				datasets: [
					{
						label: eventElementName,
						data: selectedDataset,
					}
				]
			},
			options: {}
		});
	} 
}

function registerForNotification() {
	$('#mailLoader').show();
	
	var data = {
		"mailAddress": $('#mailAddressToRegister').val(),
		"highestBlock": highestBlock+1,
		"abi": theABI,
		"selectedEventID": selectedEventID,
		"contractAddress": contractAddress
		
	};
	
	$.ajax({
	    type: 'POST',
	    url: 'http://1-dot-contracteventlistener.appspot.com/mailnotification',
	    data: JSON.stringify (data),
	    complete: registrationFinished,
	    contentType: "application/json",
	    dataType: 'json'
	});
	
}

function registrationFinished(jqXHR, textStatus) {
	$('#mailLoader').hide();
	if(jqXHR.status === 200) {
		$('#notificationBody').prepend('<div class="alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>Registration successfull</strong></div>');
	} else {
		$('#notificationBody').prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>Registration failed</strong></div>');
		
	}
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


function init() {
	$('#processABI').click(function() {
		abiDecoder.removeABI(abiDecoder.getABIs());
		processABI();
	});
	$('#startWatching').click(function () {
		$('#collapseSettings').collapse('hide');
		startWatching(3000000);
	});
	$('#chartSelector').change(generateChart);
	$('#notificationRegistrationBtn').click(registerForNotification);

}
