$(document).ready(function () { 
	
	firstQuestStart();
	let isSecondQuestActive = false;


	bgAudio = new Audio();
	if (bgAudio.canPlayType("audio/mpeg")) {
		bgAudio.setAttribute("src", "src/music/LyingonMat.mp3");
}

	if (bgAudio.canPlayType("audio/ogg")) {
		bgAudio.setAttribute("src", "src/music/LyingonMat.ogg");
}
	
	bgAudio.setAttribute("loop", "true");

	
	// ховер на li
	$('.option').hover(function(){
		$(this).css("border-style", "dashed");
		$(this).css("padding", "10px");
	}, function () {
		$(this).css("border-style", "none");
		$('.option').css("padding", "15px");
	});
	
	// клики в менюшках
	
	$('#clickToStartGame').click( function () { //клик на "начать игру"
		prologueStart();
	});

	$('#clickHowToPlayMenu').click( function () { // клик на "как играть"
        $('#howToPlayMenu').fadeIn('slow').css("display", "flex");
		$('#startScene').css("pointer-events", "none");
	});
	
	$('#clickSettingsMenu').click( function () { // клик на "настройки"
        $('#settingsMenu').fadeIn('slow').css("display", "flex");
		$('#startScene').css("pointer-events", "none");
	});
	
	$('#clickProjectDiscriptionMenu').click( function () { //клик на "о проекте"
        $('#projectDiscriptionMenu').fadeIn('slow').css("display", "flex");
		$('#startScene').css("pointer-events", "none");
	});
	
	$('#clickThanksMenu').click( function () { //клик на "благодарности"
        $('#thanksMenu').fadeIn('slow').css("display", "flex");
		$('#startScene').css("pointer-events", "none");
	});
	
	// закрытие
	
	$('#closeHowToPlayMenu').click( function () { //клик на закрыть в "как играть"
        $('#howToPlayMenu').fadeOut('slow');
		$('#startScene').css("pointer-events", "auto");
	});
	
	$('#closeSettingsMenu').click( function () { //клик на закрыть в "настройки"
        $('#settingsMenu').fadeOut('slow');
		$('#startScene').css("pointer-events", "auto");
	});
	
	$('#closeProjectDiscriptionMenu').click( function () { //клик на закрыть в "о проекте"
        $('#projectDiscriptionMenu').fadeOut('slow');
		$('#startScene').css("pointer-events", "auto");
		
	});
	
	$('#closeThanksMenu').click( function () { //клик на закрыть в "благодарности"
        $('#thanksMenu').fadeOut('slow');
		$('#startScene').css("pointer-events", "auto");
		
		
	});
	
	//перемещалки в о проекте
	
	let clickCounter = 0
	$('#rightClickMenu').click( function () { 
		$('#leftClickMenu').css("display", "block");
		clickCounter++;
		if (clickCounter == 1) {
			$('#howItStarted').css("display", "block");
			$('#whatIsIt').css("display", "none");
		} else if (clickCounter == 2) {
			$('#howItWasGoing1').css("display", "block");
			$('#howItStarted').css("display", "none");
		} else if (clickCounter == 3) {
			$('#howItWasGoing2').css("display", "block");
			$('#howItWasGoing1').css("display", "none");
			$('#rightClickMenu').css("display", "none");
		} 
	});
	
	$('#leftClickMenu').click( function () {  
		clickCounter--;
		$('#rightClickMenu').css("display", "block");
		if (clickCounter == 2) {
			$('#howItWasGoing2').css("display", "none");
			$('#howItWasGoing1').css("display", "block");
		} else if (clickCounter == 1) {
			$('#howItWasGoing1').css("display", "none");
			$('#howItStarted').css("display", "block");
			
		} else if (clickCounter == 0) {
			$('#howItStarted').css("display", "none");;
			$('#whatIsIt').css("display", "block");
			$('#leftClickMenu').css("display", "none");
		} 
	});
	
	//нажатие на навигацию в игровом окне
	$('#homeSign').click( function() { // значок дома
		$('#exitMenu').fadeIn('slow').css("display", "flex");
		$('#interactiveScene').css("pointer-events", "none");
	});
	
	$('#settingsSign').click(function() { // значок настройки 
		$('#settingsMenu').css("display", "flex");
		$('#interactiveScene').css("pointer-events", "none");
	});
	
	$('#closeSettingsMenu').click( function () { //клик на закрыть в "настройки"
        $('#settingsMenu').fadeOut('slow');
		$('#interactiveScene').css("pointer-events", "auto")
	});
	
	$('#yes').click( function () { // да, выйти из игры
		$('#gameScene').fadeOut('slow');
		$('#interactiveScene').fadeOut('slow');
		$('#startScene').fadeIn('slow');
		$('#exitMenu').fadeOut('slow');
		bgAudio.pause();
		bgAudio.currentTime = 0;

		$('#interactiveScene').css("pointer-events", "auto");
		location.reload();
	});
	
	$('#no').click( function () { // нет, закрыть меню и продолжить игру
		$('#exitMenu').fadeOut('slow');
		$('#gameScene').css("pointer-events", "auto");
	});
	
	//слайдер громкости 
	
	 $('#volumeSlider').on('input', function() {
    let musicVolume = $(this).val();
	bgAudio.volume = musicVolume/100;
    console.log('Громкость: ' + bgAudio.volume);
	});
	
	
	//часы
	
	var timeScene = "day";
	updateTime();
	
	var isStopTimeClicked = false;
	var intervalId = setInterval(updateTime, 1000); // set initial interval
	$('#stopTime').click( function() {
		isStopTimeClicked = !isStopTimeClicked; // toggle the value of isStopTimeClicked
		if (isStopTimeClicked) {
			clearInterval(intervalId); // Clear the previous interval
			setInterval(updateTime, 60000);
			$('#stopTime').css("background-color", "red");
			$('#stopTime').css("height", "11px");
		} else {
			clearInterval(intervalId); // Clear the previous interval
			intervalId = setInterval(updateTime, 1000);
			
			
			$('#stopTime').css("background-color", "black");
			$('#stopTime').css("height", "19px");
		}
	});
	
	console.log(timeScene);
	
		
		$('#clockInteractive').click( function() { 
			let date = new Date();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			$('#clockMenu').fadeIn('slow').css("display", "flex");
			$('#interactiveScene').css("pointer-events", "none");
			$('#changeClockHours').val(hours);
			$('#changeClockMinutes').val(minutes);
			
		});
		
		$('#cancel').click( function () {   // cancel изменения времени 
			$('#clockMenu').fadeOut('slow');
			$('#interactiveScene').css("pointer-events", "auto");
		});
		
		$('#save').click( function () {  // save изменения времени 
			$('#clockMenu').fadeOut('slow');
			$('#interactiveScene').css("pointer-events", "auto");
			newHours = $('#changeClockHours').val()
			newMinutes = $('#changeClockMinutes').val();
			$('#clockTime').text(newHours + ":" + newMinutes);
			calculateDayScene(newHours);
		});

	
	// hover на навигацию
	
	$('#homeSign').hover(function() { // наведение на значок дома
		$(this).attr("src", "src/home_sign_hover.png");
	}, function () {
		$(this).attr("src", "src/home_sign.png");
	});
	
	$('#settingsSign').hover(function() { // наведение на значок настроек
		$(this).attr("src", "src/settings_sign_hover.png");
	}, function () {
		$(this).attr("src", "src/settings_sign.png");
	});
	
	// ховеры на интерактивные объекты, по одиночке
	
	$('#cupInteractive').hover(function(){
		$('#mainCup').attr("src", "src/bg/hover/cup_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainCup').attr("src", "src/bg/cup.png");
		$('#catSayings').text('');
	});
	
	$('#photo1Interactive').hover(function(){
		$('#mainPhotos').attr("src", "src/bg/hover/photo1_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainPhotos').attr("src", "src/bg/photos.png");
		$('#catSayings').text('');
	});
	
	$('#photo2Interactive').hover(function(){
		$('#mainPhotos').attr("src", "src/bg/hover/photo2_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainPhotos').attr("src", "src/bg/photos.png");
		$('#catSayings').text('');
	});
	
	$('#photo3Interactive').hover(function(){
		
		$('#mainPhotos').attr("src", "src/bg/hover/photo3_hover.png");
		if (isSecondQuestActive == true) {
			$('#catSayings').text('Василиса с мамой и папой. Они часто приезжают к нам на выходных. На этом фото меня нет, не подойдет');
		} else {
			$('#catSayings').text($(this).attr('rel'));
		}
		
	}, function () {
		$('#mainPhotos').attr("src", "src/bg/photos.png");
		$('#catSayings').text('');
	});
	
	$('#aquariumInteractive').hover(function(){
		$('#mainAquarium').attr("src", "src/bg/hover/aquarium_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainAquarium').attr("src", "src/bg/aquarium.png");
		$('#catSayings').text('');
	});
	
	$('#plantInteractive').hover(function(){
		$('#mainPlant').attr("src", "src/bg/hover/plant_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainPlant').attr("src", "src/bg/plant.png");
		$('#catSayings').text('');
	});
	
	$('#bookInteractive').hover(function(){
		$('#mainShelf').attr("src", "src/bg/hover/book_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainShelf').attr("src", "src/bg/shelf.png");
		$('#catSayings').text('');
	});
	
	$('#ballInteractive').hover(function(){
		$('#mainBall').attr("src", "src/bg/hover/ball_hover.png");
		$('#catSayings').text($(this).attr('rel'));
	}, function () {
		$('#mainBall').attr("src", "src/bg/ball.png");
		$('#catSayings').text('');
	});
	
	
	
	//canvas magic;
	
	const canvasCatOnMain = document.getElementById('catOnMain');
	const ctxCatOnMain = canvasCatOnMain.getContext('2d');
	const canvasCatOnMain_WIDTH = canvasCatOnMain.width = 400;
	const canvasCatOnMain_HEIGHT = canvasCatOnMain.height = 225;
	const catOnMainImage = new Image();
	catOnMainImage.src = 'src/catOnMain.png';
	const spriteWidth = 400;
	const spriteHeight = 225;
	let frameX = 0;
	let gameframe = 0;
	const staggerFrames = 20;
	
	function showCat() { // статический кот
		ctxCatOnMain.clearRect(0,0, canvasCatOnMain_WIDTH, canvasCatOnMain_HEIGHT);
		ctxCatOnMain.drawImage(catOnMainImage, 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
		requestAnimationFrame(showCat);
	}
	
	function animate() { // машет хвостом
		let cycle = 0;
		ctxCatOnMain.clearRect(0,0, canvasCatOnMain_WIDTH, canvasCatOnMain_HEIGHT);
		ctxCatOnMain.drawImage(catOnMainImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
		if (gameframe % staggerFrames == 0) {
			if (frameX < 5) { frameX++;}
			else { frameX = 0; }
		}
		gameframe++;
		cycle++;
		console.log(cycle);
		if (gameframe < 121) {
			requestAnimationFrame(animate);
			
		} else {
			gameframe = 0;
			frameX = 0
		}
	}
	
	showCat();
	setInterval(animate, 30000);
	
	$('#catOnMain').click (function() { // клик на кота на главном экране
		animate();

	});
	
	// передвижение кота
	
	
	/*$('#coalKittyAvailableArea').click(function(e) {
		kittyWalks()
        var posX = e.pageX - $(this).offset().left;
        var posY = e.pageY - $(this).offset().top;
		
        $('#coalKitty').css({
          top: posY - 300,
          left: posX - 300
        });
		
        $('#catSayings').css({
          top: posY - 300,
          left: posX - 150
        });
      }); */
	  
	
	const canvasCoalKitty = document.getElementById('coalKitty');
	const ctxCoalKitty = canvasCoalKitty.getContext('2d');
	const canvasCoalKitty_WIDTH = canvasCoalKitty.width = 233;
	const canvasCoalKitty_HEIGHT = canvasCoalKitty.height = 300;
	const CoalKittyImage = new Image();
	
	const CoalKittySpriteWidth = 233;
	const CoalKittySpriteHeight = 300;
	let CoalKittyFrameX = 0;
	let CoalKittyGameFrame = 0;
	const CoalKittyStaggerFrames = 20;
	
	function kittySits() { // статический кот
	CoalKittyImage.src = 'src/kitty/0.png';
		ctxCoalKitty.drawImage(CoalKittyImage, 0, 0, CoalKittySpriteWidth, CoalKittySpriteHeight, 0, 0, CoalKittySpriteWidth, CoalKittySpriteHeight);
		requestAnimationFrame(kittySits);
	}
	
	function kittyWalks() { // 
		CoalKittyImage.src = 'src/kitty/kitty.png'
		ctxCoalKitty.clearRect(0,0, canvasCatOnMain_WIDTH, canvasCatOnMain_HEIGHT);
		ctxCoalKitty.drawImage(CoalKittyImage, CoalKittyFrameX * CoalKittySpriteWidth, 0, CoalKittySpriteWidth, CoalKittySpriteHeight, 0, 0, CoalKittySpriteWidth, CoalKittySpriteHeight);
		if (CoalKittyGameFrame % CoalKittyStaggerFrames == 0) {
			if (CoalKittyFrameX < 3) { CoalKittyFrameX++;}
			else { CoalKittyFrameX = 0; }
		}
		CoalKittyGameFrame++;
		requestAnimationFrame(kittyWalks)
	} 


	// поведение кота 
	
	
	
	kittySits()
	
	
	
	
	// игровые задачи 
	let curtainsLightCounter = 0
		let threadLightCounter = 0
	// 1  задание - включить свет
	function firstQuestStart() {
		
		$('.InteractiveGameObject').css("pointer-events", "none");
		$('#navigation').css("pointer-events", "none");
		$('#catSayings').text('Тут довольно темно. Давай попробуем добавить немного света!');
		$('#skip').click( function () {	
			$('#objectives').text('Добавить немного света в комнату 0/2');
			$('#catSayings').text('');
			$('#skip').fadeOut('fast');
			$('.InteractiveGameObject').css("pointer-events", "auto");
			$('#navigation').css("pointer-events", "auto");
		});
		
		$('#switcherInteractive').click( function () {	
			$('#thread').attr("src", "src/bg/thread_on.png");
			$('#lights').attr("src", "src/bg/lights.png");
			threadLightCounter = 1;
			checkLightScore();
		});
		
		$('#curtainsInteractive').click( function () {	
			$('#curtains').attr("src", "src/bg/curtains.png");
			$('#shadows').fadeOut('very slow');
			curtainsLightCounter = 1;
			checkLightScore();
		});
	}
	
	
	function secondQuestStart() {
		isSecondQuestActive = true;
		$('.InteractiveGameObject').css("pointer-events", "none");
		$('#navigation').css("pointer-events", "none");
		$('#skip').css('display', 'block');
		$('#catSayings').text('Помоги найти такую фотографию, где Василиса в окружении семьи');
		
		$('#skip').click( function () {	
			$('#objectives').css('left','10px');
			$('#objectives').text('Найдите подходящую фотографию');
			$('#catSayings').text('');
			$('#skip').fadeOut('fast');
			$('.InteractiveGameObject').css("pointer-events", "auto");
			$('#navigation').css("pointer-events", "auto");
		});
		
		$('#lPhotoInteractive').click(function(){ 
			if ($('#lPhoto').attr("rel") ==  "Мой первый Новый год с семьей. Ёлка была очень красивой! Думаю, это фото подойдет") {
				epilogueStart();
				console.log('yessssss');
				$('#bookMenu').fadeOut('fast');
				$('#gameScene').fadeOut('fast');
				$('#interactiveScene').fadeOut('fast');
			}
			
		});
	}
	
	
	$('#bookInteractive').click( function () {
		$('#bookMenu').fadeIn('slow').css("display", "flex");	
		$('#interactiveScene').css("pointer-events", "none");
		$('#navigation').css("pointer-events", "none");		
			
		})
	
	
	$('#closeBookMenu').click( function () {
		$('#bookMenu').fadeOut('fast');
		$('#interactiveScene').css("pointer-events", "auto");
		$('#navigation').css("pointer-events", "auto");
		$('#lPhoto').attr("src", "src/album/1.png");
		$('#lPhoto').attr("rel", "Мое фото после купания. Посмотрите, какой я несчастный!");
		$('#rPhoto').attr("src", "src/album/2.png");
		$('#rPhoto').attr("rel", "Василиса на костюмированной вечеринке");
		$('#left').css('display', 'none');
		$('#right').css('display', 'block');
	});
	
	$('#right').click( function () { 
		$('#lPhoto').attr("src", "src/album/3.png");
		$('#rPhoto').attr("src", "src/album/4.png");
		$('#rPhoto').attr("rel", "Мы с Василисой переезжаем из родного города");
		$('#left').css('display', 'block');
		$('#right').css('display', 'none');
		if (isSecondQuestActive == true) {
			$('#lPhoto').attr("rel", "Мой первый Новый год с семьей. Ёлка была очень красивой! Думаю, это фото подойдет");
		} else {
			$('#lPhoto').attr("rel", "Мой первый Новый год с семьей. Ёлка была очень красивой!");
		}
		
	
	});
	
	$('#left').click( function () { 
		$('#lPhoto').attr("src", "src/album/1.png");
		$('#lPhoto').attr("rel", "Мое фото после купания. Посмотрите, какой я несчастный!");
		$('#rPhoto').attr("src", "src/album/2.png");
		$('#rPhoto').attr("rel", "Василиса на костюмированной вечеринке");
		$('#left').css('display', 'none');
		$('#right').css('display', 'block');
	});
	
	$('#rPhotoInteractive').hover(function(){
		$('#catAlbumSayings').text($('#rPhoto').attr('rel'));
		$('#catAlbumSayings').css('display', 'flex');
	}, function () {
		$('#catAlbumSayings').css('display', 'none');
	});
	
	$('#lPhotoInteractive').hover(function(){
		$('#catAlbumSayings').text($('#lPhoto').attr('rel'));
		$('#catAlbumSayings').css('display', 'flex');
	}, function () {		
		$('#catAlbumSayings').css('display', 'none');
	});
	
	
	//сторонние functions
	
	function calculateDayScene(hours) {
			if (hours >= 0 && hours <= 4) {
			  timeScene = "night";
			  $('#dayTime').attr("src", "src/bg/night.png");
			} else if (hours > 4 && hours <= 12) {
			  timeScene = "morning";
			  $('#dayTime').attr("src", "src/bg/morning.png");
			} else if (hours > 12 && hours <= 18) {
			  timeScene = "evening";
			  $('#dayTime').attr("src", "src/bg/day.png");
			} else {
			  timeScene = "night";
			  $('#dayTime').attr("src", "src/bg/evening.png");
			}
	}
	
	function updateTime() { // обновляет время на часах
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		
		if (minutes < 10) {
			minutes = String("0" + minutes).slice(-2);	
		};
		if (hours < 10) {
			hours = String("0" + hours).slice(-2);
		};
		$('#clockTime').text(hours + ":" + minutes)
		console.log(hours, minutes)
		calculateDayScene(hours);
		
	}
	
	function checkLightScore() {
		if (curtainsLightCounter == 0 && threadLightCounter == 1) {
			$('#objectives').text('Добавить немного света в комнату 1/2');
		} if (curtainsLightCounter == 1 && threadLightCounter == 0) {
			$('#objectives').text('Добавить немного света в комнату 1/2');
		} else if (curtainsLightCounter == 1 && threadLightCounter == 1) {
			$('#objectives').text('Добавить немного света в комнату 2/2. Выполнено!');
			setTimeout(function() {
				$('#objectives').animate({ left: "-800px" }, 2000);
			}, 3000);
				
			setTimeout(secondQuestStart,4000);
		}
	}
	
	function prologueStart() {
		$('#prologue').css('display', 'flex');
		var pimages = [
		"src/prologue/1.png",
		"src/prologue/2.png",
		"src/prologue/3.png",
		"src/prologue/4.png",
		"src/prologue/5.png",
		"src/prologue/6.png",
		"src/prologue/7.png"
		];

		var currentIndex = 0;

		$("#prologue").click(function() {
		currentIndex = (currentIndex + 1) % pimages.length;
		if (currentIndex == 1) {
			$("#prologueText").text('Вы когда-нибудь задумывались о том, кто останется с вами, когда вам будем плохо?')
		} else if (currentIndex == 3) {
			$("#prologueText").text('Когда станет совсем одиноко, будет ли рядом с вами кто-то, кто сможет поддержать вас?')
		}
		if (currentIndex == 6) {
			$("#prologuePhoto").attr("src", pimages[currentIndex]);
			$('#prologue').css("pointer-events", "none");
			setTimeout(startGame, 2500);
			
		} else {
			$("#prologuePhoto").attr("src", pimages[currentIndex]);
		}
		});
	}
	
	function epilogueStart() {
		bgAudio.setAttribute("src", 'none');
		$('#interactiveScene').css("pointer-events", "none");
		$('#navigation').css("pointer-events", "none");	
		$('#prologue').attr("id","epilogue");
		$('#prologueText').attr("id","epilogueText");
		$('#prologuePhoto').attr("id","epiloguePhoto");
		
		$("#epilogueText").text('');
		$('#epilogue').css("pointer-events", "auto");
		console.log('starrt');
		$("#epiloguePhoto").attr("src", "src/epilogue/1.png");
		$('#golden').attr("src", "src/epilogue/golden.png");
		$('#epilogue').css('display', 'flex');
		var eimages = [
		"src/epilogue/1.png",
		"src/epilogue/2.png",
		"src/epilogue/3.png",
		"src/epilogue/4.png",
		"src/epilogue/5.png",
		"src/epilogue/6.png",
		"src/epilogue/7.png",
		"src/epilogue/8.png",
		"src/epilogue/9.png",
		"src/epilogue/10.png",
		"src/epilogue/11.png",
		"src/epilogue/12.png",
		];
		var currenteIndex = 0;

		$("#epilogue").click(function() {
		currenteIndex = (currenteIndex + 1) % eimages.length;
		if (currenteIndex == 10) {
			$("#epilogueText").text('Плохие времена иногда наступают, но не стоит забывать, что есть те, кто поддержит в трудную минуту');
			$("#epiloguePhoto").attr("src", eimages[currenteIndex]);
			
		} else if (currenteIndex == 11) {
			$("#epilogueText").text('Конец');
			
			$("#epiloguePhoto").attr("src", eimages[currenteIndex]);
			$('#epilogue').css("pointer-events", "none");
			setTimeout(endGame, 2000);
		} else {
			$("#epiloguePhoto").attr("src", eimages[currenteIndex]);
		}
		});
	}
	
	function startGame() {
		$('#startScene').fadeOut('fast');
		bgAudio.play();
		$('#interactiveScene').fadeIn('slow');
		$('#gameScene').css("display", "flex");
		$('#prologue').fadeOut('fast')
		 
	}
	
	function endGame(){
		$('#gameScene').fadeOut('slow');
		$('#interactiveScene').fadeOut('slow');
		$('#startScene').fadeIn('slow');
		$('#thanksForPlaying').fadeIn('slow').css('display', 'flex');
		$('#epilogue').fadeOut('slow');
		$('#startScene').css("pointer-events", "none");
	}
	
	$('#reloadPage').click(function() { 
		location.reload();
	})
})