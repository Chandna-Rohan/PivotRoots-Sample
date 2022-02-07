var monthlyData = null;
var yearlyData = null;
var selectedGrade = null;
var yearlySelectedGrade = null;
$(document).ready(function () {
	$('.monthly').removeClass('inactive');
	$('#monthly').addClass('activeTab');
	$('.monthly').addClass('active');
	$('.parent-yearly-footer').hide();
	init();
});

function showTabData(evt, tabName) {
	const tabContent = $('.tabcontent');

	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].className = tabContent[i].className.replace(' activeTab', '');
	}

	const tabList = $('.tabTitle');

	for (i = 0; i < tabList.length; i++) {
		tabList[i].className = tabList[i].className.replace(' active', '');
		tabList[i].className += tabList[i].className.indexOf('inactive') > -1 ? '' : ' inactive';
	}

	$('#' + tabName).removeClass('activeTab');
	$('#' + tabName).addClass('activeTab');

	evt.currentTarget.className += ' active';
	evt.currentTarget.className = evt.currentTarget.className.replace(' inactive', '');
}

function showInnerTabData(evt) {
	const tabList = $('.inner-tabTitle');
	for (i = 0; i < tabList.length; i++) {
		tabList[i].className = tabList[i].className.replace(' active', '');
	}
	evt.currentTarget.className += ' active';

	var customArray = [];
	monthlyData.forEach(element => {
		if (element['grade'] === selectedGrade) {
			var boards = element['boards'];
			var general = boards[evt.target.value];

			for (var key in general) {
				// skip loop if the property is from prototype
				if (!general.hasOwnProperty(key)) continue;

				var obj = general[key];
				customArray.push(obj);
			}

			bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY
		}
	});
}

function showYearlyInnerTabData(evt) {
	const tabList = $('#yearly .inner-tabTitle');
	for (i = 0; i < tabList.length; i++) {
		tabList[i].className = tabList[i].className.replace(' active', '');
	}
	evt.currentTarget.className += ' active';

	var customArray = [];
	yearlyData.forEach(element => {
		if (element['grade'] === yearlySelectedGrade) {
			var boards = element['boards'];
			var general = boards[evt.target.value];
			customArray.push(general);
			bindYearlyTableData(customArray); // TO BIND YEALRY COURSES DATA DYNAMICALLY
		}
	});
}

/* On Monthly Grade Change */
function gradeChange(evt) {
	selectedGrade = evt.target.value;
	monthlyData.forEach(element => {
		if (element['grade'] === selectedGrade) {
			var $btns = ''; // Buttons/TAB for GRADE 10 & ABOVE
			var buttons = [];

			var customArray = [];
			var boards = element['boards'];

			if (Object.keys(boards).length > 1) {
				customArray = [];
				buttons = [];
				// FOR GRADE 10 & Above
				for (const key in boards) {
					$btns;
					if (Object.hasOwnProperty.call(boards, key)) {
						// const element = boards[key];
						buttons.push(key);
					}
				}
				var firstFilter = null;
				buttons.forEach((element, index) => {
					if (index === 0) firstFilter = element;
					$btns += '<button class="inner-tabTitle ' + (index === 0 ? 'active' : '') + '" onclick="showInnerTabData(event)" value="' + element + '">' + element + '</button>';
				});

				$('#grade-filter').html($btns);

				var general = boards[firstFilter];

				for (var key in general) {
					// skip loop if the property is from prototype
					if (!general.hasOwnProperty(key)) continue;

					var obj = general[key];
					customArray.push(obj);
				}

				bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY

			} else {
				// FOR GRADE BELOW 10
				customArray = [];
				var general = boards['general'];
				for (var key in general) {
					// skip loop if the property is from prototype
					if (!general.hasOwnProperty(key)) continue;

					var obj = general[key];
					customArray.push(obj);
				}
				$('#grade-filter').html($btns);

				bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY

				/* customArray.forEach((element, index) => {
					$trsWEB += '<tr onclick="rowClicked('+ index +')">'+
									'<td>'+
										'<input type="radio" id="'+ element['valid'] +'" name="monthly_courses" value="'+ element['valid'] +'">'+
									'</td>'+
									'<td>'+
										'<label class="month-count"> '+ element['valid'] +'</label>'+
										'<p class="refund"> '+ element['refund'] +' </p>'+
									'</td>'+
									'<td>'+
										'<p class="price">₹ '+ element['price'] +'</p>'+
										'<label class="discount">'+ element['discount'] +'% OFF</label>'+
									'</td>'+
									'<td>'+
										'<label class="price-per-session">₹ '+ element['per_class_price'] +' per session</label>'+
										'<p class="session-count">'+ element['total_sessions'] +' Sessions</p>'+
									'</td>'+
								'</tr>';

					$trsMobile += '<tr onclick="rowClicked('+ index +')">'+
									'<td>'+
										'<input type="radio" id="'+ element['valid'] +'" name="monthly_courses" value="'+ element['valid'] +'">'+
									'</td>'+
									'<td>'+
										'<label class="month-count"> ₹ '+ element['price'] +' for '+ element['valid'] +' with '+ element['discount'] +' OFF ('+ element['total_sessions'] +') </label>'+
										'<p class="refund"> ₹ '+ element['per_class_price'] +' per session </p>'+
										'<p class="refund"> '+ element['refund'] +' </p>'+
									'</td>'+
								'</tr>';
				});
				// RENDER TABLE DATA FOR WEB
				$('.desktop-visibility table').html($trsWEB);

				// RENDER TABLE DATA FOR MOBILE
				$('.mobile-visibility table').html($trsMobile); */

			}
		}
	});
}

/* On Yearly Grade Change */
function yearlyGradeChange(evt) {
	yearlySelectedGrade = evt.target.value;
	yearlyData.forEach(element => {
		if (element['grade'] === yearlySelectedGrade) {
			var $btns = ''; // Buttons/TAB for GRADE 10 & ABOVE
			var buttons = [];

			var customArray = [];
			var boards = element['boards'];

			if (Object.keys(boards).length > 1) {
				customArray = [];
				buttons = [];
				// FOR GRADE 10 & Above
				for (const key in boards) {
					$btns;
					if (Object.hasOwnProperty.call(boards, key)) {
						// const element = boards[key];
						buttons.push(key);
					}
				}
				var firstFilter = null;
				buttons.forEach((element, index) => {
					if (index === 0) firstFilter = element;
					$btns += '<button class="inner-tabTitle ' + (index === 0 ? 'active' : '') + '" onclick="showYearlyInnerTabData(event)" value="' + element + '">' + element + '</button>';
				});

				$('#yearly-grade-filter').html($btns);

				var general = boards[firstFilter];
				customArray.push(general);
				console.log(typeof general['syllabus']);
				bindYearlyTableData(customArray);
				// bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY

			} else {
				// FOR GRADE BELOW 10
				customArray = [];
				var general = boards['general'];
				for (var key in general) {
					// skip loop if the property is from prototype
					if (!general.hasOwnProperty(key)) continue;

					var obj = general[key];
					customArray.push(obj);
				}
				$('#yearly-grade-filter').html($btns);

				// bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY

			}
		}
	});
}


function bindTableData(customArray) {
	var $trsWEB = null; // Table ROW For WEB
	var $trsMobile = null; // TABLE ROW For Mobile
	customArray.forEach((element, index) => {
		$trsWEB += '<tr onclick="rowClicked(' + index + ', 1)">' +
			'<td>' +
			'<input type="radio" id="' + element['valid'] + '" name="monthly_courses" value="' + element['valid'] + '">' +
			'</td>' +
			'<td>' +
			'<label class="month-count"> ' + element['valid'] + '</label>' +
			'<p class="refund"> ' + element['refund'] + ' </p>' +
			'</td>' +
			'<td>' +
			'<p class="price">₹ ' + element['price'] + '</p>' +
			'<label class="discount">' + element['discount'] + '% OFF</label>' +
			'</td>' +
			'<td>' +
			'<label class="price-per-session">₹ ' + element['per_class_price'] + ' per session</label>' +
			'<p class="session-count">' + element['total_sessions'] + ' Sessions</p>' +
			'</td>' +
			'</tr>';

		$trsMobile += '<tr onclick="rowClicked(' + index + ', 0)">' +
			'<td>' +
			'<input type="radio" id="' + element['valid'] + '" name="monthly_courses" value="' + element['valid'] + '">' +
			'</td>' +
			'<td>' +
			'<label class="month-count"> ₹ ' + element['price'] + ' for ' + element['valid'] + ' with ' + element['discount'] + ' OFF (' + element['total_sessions'] + ') </label>' +
			'<p class="refund"> ₹ ' + element['per_class_price'] + ' per session </p>' +
			'<p class="refund"> ' + element['refund'] + ' </p>' +
			'</td>' +
			'</tr>';
	});
	// RENDER TABLE DATA FOR WEB
	$('.desktop-visibility table').html($trsWEB);

	// RENDER TABLE DATA FOR MOBILE
	$('.mobile-visibility table').html($trsMobile);
}

function bindYearlyTableData(customArray) {
	var $divs = '';

	customArray.forEach(element => {
		$divs += '<div class="box">'+
					'<p class="title"> Total <br /> Sessions </p>'+
					'<p class="count">'+ element['total_sessions'] +'</p>'+
				'</div>'+
				'<div class="box">'+
					'<p class="title"> Online Pre <br /> Assessments </p>'+
					'<p class="count">'+ element['online_pre_assignments'] +'</p>'+
				'</div>'+
				'<div class="box">'+
					'<p class="title"> Online Post <br /> Assessments </p>'+
					'<p class="count">'+ element['online_post_assignments'] +'</p>'+
				'</div>'+
				'<div class="box">'+
					'<p class="title"> Online <br /> Practice </p>'+
					'<p class="count">'+ element['online_assignments'] +'</p>'+
				'</div>'+
				'<div class="box">'+
					'<p class="title"> Online <br /> Tests </p>'+
					'<p class="count">'+ element['online_tests'] +'</p>'+
				'</div>'+
				'<div class="box">'+
					'<p class="title"> Career Counselling Sessions <br /> with Edu Coach </p>'+
					'<p class="count">'+ element['career_counselling_sessions'] +'</p>'+
				'</div>';
	
		var $topics = '';
		if (typeof element['syllabus'] === "object") {
			for (const key in element['syllabus'][0]) {
				if (Object.hasOwnProperty.call(element['syllabus'][0], key)) {
					const value = element['syllabus'][0][key];
					$topics += '<div class="course-topics">'+
									'<p class="topic">'+ key +'</p>'+
									'<p class="description">'+ value +'</p>'+
								'</div>';
				}
			}
		} else {
			console.log(element['syllabus']);
			$topics += '<div class="course-topics">'+
							'<p class="topic">'+ element['syllabus'] +'</p>'+
						'</div>';
		}
		$('#yearly .third-layer .topics-collection').html($topics);
	});
	$('#yearly .second-layer').html($divs);
}

function showMonthlyData() {
	$('.monthly.footer').show();
	$('.parent-yearly-footer').hide();
	console.log('Monthly Data to be shown');
}

function showYearlyData() {
	$('.monthly.footer').hide();
	$('.parent-yearly-footer').show();
	yearlyData.forEach(element => {
		if (element['grade'] === yearlySelectedGrade) {
			var $btns = ''; // Buttons/TAB for GRADE 10 & ABOVE
			var buttons = [];

			var customArray = [];
			var boards = element['boards'];

			if (Object.keys(boards).length > 1) {
				customArray = [];
				buttons = [];
				// FOR GRADE 10 & Above
				for (const key in boards) {
					$btns;
					if (Object.hasOwnProperty.call(boards, key)) {
						// const element = boards[key];
						buttons.push(key);
					}
				}
				var firstFilter = null;
				buttons.forEach((element, index) => {
					if (index === 0) firstFilter = element;
					$btns += '<button class="inner-tabTitle ' + (index === 0 ? 'active' : '') + '" onclick="showYearlyInnerTabData(event)" value="' + element + '">' + element + '</button>';
				});

				$('#yearly-grade-filter').html($btns);

				var general = boards[firstFilter];
				customArray.push(general);
				console.log(typeof general['syllabus']);
				bindYearlyTableData(customArray);
				// bindTableData(customArray); // TO BIND DATA FOR TABLE DYNAMICALLY

			}
		}
	});
}

function rowClicked(index, whichClicked) {
	// 1 FOR WEB AND 0 for MOBILE
	if (whichClicked === 1) $('.desktop-visibility input[type="radio"]')[index].checked = true;
	else if (whichClicked === 0) $('.mobile-visibility input[type="radio"]')[index].checked = true;
}

function loadJSON(callback) {
	var xObj = new XMLHttpRequest();
	xObj.overrideMimeType("application/json");
	xObj.open('GET', 'assets/data.json', true);
	// the local path of your file
	xObj.onreadystatechange = function () {
		if (xObj.readyState === 4 && xObj.status === 200) {
			// callback function
			callback(xObj.responseText);
		}
	};
	xObj.send(null);
}

function init() {

	/* $.ajax({
		url: "./assets/data.json",
	}).done(function(data) {
		console.log(data);
			monthlyData = data[0]['monthly'];
			yearlyData = data[1]['yearly'];
			$('select').change();
	}); */

	$.ajax({
		url:"./assets/data.json",
		method: 'GET',
		crossDomain: true,
		success:function(data){
			// do stuff with json (in this case an array)
			monthlyData = data[0]['monthly'];
			yearlyData = data[1]['yearly'];
			$('select').change();
		},
		error:function(){
			loadJSON(function (response) {
				// parse JSON string into JSON Object
				// console.log('response =', response);
				var data = JSON.parse(response);
				monthlyData = data[0]['monthly'];
				yearlyData = data[1]['yearly'];
				$('select').change();
				// console.log('your local JSON =', JSON.stringify(json, null, 4));
				// render to your page
				/* const app = document.querySelector('#app');
				app.innerHTML = '<pre>' + JSON.stringify(json, null, 4) + '</pre>'; */
			});
		}      
   });
}