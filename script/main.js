let button = document.querySelectorAll('.selector > button');
let articles = document.querySelectorAll('.articles > .grid-container > article');
let fox = 'https://newsapi.org/v2/everything?sources=fox-news&apiKey=5cb9d5374b324902b0ab266a4f49197b';
let google = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=5cb9d5374b324902b0ab266a4f49197b';
let bbc = 'https://newsapi.org/v2/everything?sources=bbc-news&apiKey=5cb9d5374b324902b0ab266a4f49197b';
let natGeo = 'https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=5cb9d5374b324902b0ab266a4f49197b';
let count = 0;

let sources = [fox, google, bbc, natGeo]
let xhr = new XMLHttpRequest();
let outlet = document.getElementById('outlet');



let change = () => {
	xhr.open('GET', sources[count]);
	xhr.onload = function () {

		let data = JSON.parse(xhr.responseText);

		console.log(data.articles[count].source.id, data)

		outlet.innerText = data.articles[count].source.name
		let counter = 0;
		articles.forEach(article => {

			article.innerHTML = `
				<a href="` + data.articles[counter].url + `">
				<div class="inner">
				<h3>` + data.articles[counter].title + `</h3>
				<p class="description">` + data.articles[counter].description + `</p>
				<p class="publisher">Published By: ` + data.articles[counter].author + `</p>
				<small>Published On: ` + data.articles[counter].publishedAt + `</small>
				</div>
				</a>
				`;
			let author = article.querySelectorAll('.publisher')[0];
			if (data.articles[counter].author === null) {
				author.innerText = "Published By: unspecified";
			}
			article.style.backgroundImage = "url('" + data.articles[counter].urlToImage + "')";
			counter++
		})

	};
	xhr.send();
	console.log(count);
}
change();




// go forward
button[1].addEventListener('click', () => {
	if (count == sources.length - 1) count = -1;
	count++;
	change();
});


// go back
button[0].addEventListener('click', () => {
	if (count == 0) count = sources.length;
	count--;
	change();
});

let menu = document.getElementById('menu'),
	menuIcon = document.getElementById('menuIcon'),
	element = document.documentElement,
	menuList = document.querySelectorAll('#menu > ul')[0];

function exposeMenu() {
	if (menuList.style.marginLeft == "-180px") {
		menuList.style.marginLeft = "0px";
		menuIcon.innerText = "clear";
		menuIcon.style.left = "180px";
	} else {
		menuList.style.marginLeft = "-180px";
		menuIcon.innerText = "dehaze";
		menuIcon.style.left = "5px";
	}
}

menuIcon.addEventListener('click', exposeMenu);
