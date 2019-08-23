// enter some javascript here and it will run
// on every page on this domain (location.host)

//include jquery

var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// --------

setInterval( function(){
    window.location.reload();
}, 360000);

var b = document.createElement("button");
b.setAttribute('onclick','doTheForm()');
b.setAttribute('value',"Dotheform");
document.getElementsByTagName('body')[0].appendChild(b);

//Getting our session token

var containingCode = document.getElementsByTagName('body')[0].innerHTML;
var locationOfToken = containingCode.search('sessionSecureToken');
var token = containingCode.substring(locationOfToken + 31,locationOfToken + 67);

// -------
var postData = {
	eventId : '',
	flowExecutionKey : '',
	pageContextId : '',
	instanceId : ''
}

function doTheForm(){
	$.post("https://wd5.myworkday.com/linkedin/button/c2099207/117/206.htmld",
	    {
	      'sessionSecureToken': token
	    },
	    function(data,status){
	    	postData.flowExecutionKey = data.flowExecutionKey;
	    	postData.pageContextId = data.pageContextId;
	    	postData.eventId = $.grep( $.grep( $.grep( data.body.children, function( n, i ) {
			  	return n.widget==='fieldSet';
			}), function( n, i ){
				return n.label==='Details';
			})[0].children, function( n, i ){
				return n.label==='Task';
			})[0].id;

			$.post("https://wd5.myworkday.com/linkedin/prompt/" + postData.pageContextId + "/" + postData.eventId + ".htmld",
				{
					'sessionSecureToken': token,
					'_eventId_prompt': postData.eventId,
					'_flowExecutionKey': postData.flowExecutionKey
				},
				function(data1,status1){
					postData.instanceId = data1.instances[0].instanceId;

					
					var first = postData.eventId;
					var second = postData.instanceId + '_DID';
					var third = postData.instanceId + '_IID';
					var fourth = '_eventId_add';
					var fifth = '_flowExecutionKey';
					var sixth = 'sessionSecureToken';

					var submit = '_eventId_submit';

					$.ajax({
						type: "POST",
						url: "https://wd5.myworkday.com/linkedin/flowController.htmld",
						data: {
							[first]: postData.instanceId,
							[second]: 'break',
							[third]: postData.instanceId,
							[fourth]: postData.eventId,
							[fifth]: postData.flowExecutionKey,
							[sixth]: token
						},
						success: function(data){
							
							$.ajax({
								type: "POST",
								url: "https://wd5.myworkday.com/linkedin/flowController.htmld",
								data: {
									[submit]: postData.eventId,
									[fifth]: postData.flowExecutionKey,
									[sixth]: token
								},
								success: function(data){
									console.log(data);
								}
							});							
						}
					});
				}	
			);

		}
	);
}



