var theABI, etherscanRequestPostfix, highestBlock, eventElementData, myLineChart, changedEvent, elementCounter;

init();

var logs = {
	"status" : "1",
	"message" : "OK",
	"result" : [
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0xa992fe6b2702d910fe8bcf8e7baa116709c17d3a3ab88028773928dfe6ff7753" ],
				"data" : "0x0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002",
				"blockNumber" : "0x31c8a1",
				"timeStamp" : "0x58b4a467",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x5b07f",
				"logIndex" : "0x2",
				"transactionHash" : "0x744a0fcf7fc108b6eb16bb90f5d0b837d96881fd80aeaaaca965056ca2f58d7b",
				"transactionIndex" : "0x"
			},
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0x314c3327ae1b9e009c306eaed3b221e30f203c40d739f87c283224ef3dfb3449" ],
				"data" : "0x0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000001b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
				"blockNumber" : "0x31d8fa",
				"timeStamp" : "0x58b58cb7",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x5b03f",
				"logIndex" : "0x3",
				"transactionHash" : "0x9a92c02e631dda9c73344f42f555d9cafaac9eb618131e41aa7dd27700d0be9a",
				"transactionIndex" : "0x3"
			},
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0x314c3327ae1b9e009c306eaed3b221e30f203c40d739f87c283224ef3dfb3449" ],
				"data" : "0x000000000000000000000000000000000000000000000000000000000000013600000000000000000000000000000000000000000000000000000000000008b800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
				"blockNumber" : "0x31d99b",
				"timeStamp" : "0x58b595a7",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x5e7bd",
				"logIndex" : "0x6",
				"transactionHash" : "0x338a55a9fb0fed7a7e3a017a589a1fdf4cca07b964495fc2241579edc4470cf9",
				"transactionIndex" : "0x9"
			},
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0x314c3327ae1b9e009c306eaed3b221e30f203c40d739f87c283224ef3dfb3449" ],
				"data" : "0x000000000000000000000000000000000000000000000000000000000000014d000000000000000000000000000000000000000000000000000000000000096000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
				"blockNumber" : "0x31dac5",
				"timeStamp" : "0x58b5a690",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x51d41",
				"logIndex" : "0x1",
				"transactionHash" : "0x09c1e5e09a00fc0ae5321b5761e286af38ef11fddea7584d449620e11c9baf27",
				"transactionIndex" : "0x2"
			},
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0xc05dc2b2b7e9334f2fbe20a1e3ad907649b12abd58108ab4b36b909f4f6e1f4b" ],
				"data" : "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003",
				"blockNumber" : "0x31ec45",
				"timeStamp" : "0x58b6a434",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x332c0",
				"logIndex" : "0xb",
				"transactionHash" : "0xe8ba8f21f6a4e14388bec9a96196382c0beed6e7e1692c24d28b64faee455394",
				"transactionIndex" : "0x20"
			},
			{
				"address" : "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae",
				"topics" : [
						"0x8faa71ea6815d04d3023d6d7375593635e89bed65aac952c139b041df661561c",
						"0x800557835dbbbf9bcf987646ef0cef09f147912419c58be3c315bddd8983b28b" ],
				"data" : "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
				"blockNumber" : "0x31ec48",
				"timeStamp" : "0x58b6a47e",
				"gasPrice" : "0x4a817c800",
				"gasUsed" : "0x326d1",
				"logIndex" : "0x16",
				"transactionHash" : "0x94f49fb8c4556bd2a1dc3d125a7c8b318aeaadd62b2b8ac006c114dc60e5f419",
				"transactionIndex" : "0x21"
			} ]
};

logs.result.reverse();

processABI();
startWatching();

var myVar = setInterval(myTimer, 20000);

function startWatching() {
	changedEvent = true;
	elementCounter = 0;
	if(myLineChart !== undefined) {
		myLineChart.destroy();
	}
	highestBlock = 3000000;
	eventElementData =[];
	$('#eventList').empty();
	createEtherscanRequestPostfix();
	sendRequest(highestBlock, "latest");
}

function sendRequest(fromBlock, toBlock) {
	var url = createEtherscanRequestPrefix(fromBlock, toBlock) + etherscanRequestPostfix; 
	$.getJSON(url, handleEtherscanData);
	
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
	
	var eventCounter = 0;
	var checkedElement = $('.eventCheckbox:checked').toArray();
	for( checkedElementIndex in checkedElement) {
		url += "&topic" + eventCounter + "=0x" + checkedElement[checkedElementIndex].id;
		
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

function init() {
	$('#processABI').click(function() {
		abiDecoder.removeABI(abiDecoder.getABIs());
		processABI();
	});
	$('#startWatching').click(startWatching);
	$('#chartSelector').change(generateChart);

}
