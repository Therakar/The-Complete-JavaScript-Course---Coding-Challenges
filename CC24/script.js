'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//functions

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// Function that allows me to make pass a certain number of seconds
const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

//PART 1
//recreate the code of the previous challenge (23) with async await

const loadNPause = async function () {
  //wrap everything in a try block
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg'); //I now await that promise and store the result in this img variable
    console.log('Image 1 loaded');
    await wait(2); //I can just await to wait(2) and since the wait promise doesn't have any risolved value
    // I don't need to save anything into a variable | I'm pausing the execution for 2 seconds
    img.style.display = 'none'; //hiding the img, i can use directly img beacuse unlike the previous challenge (23), here I'm in the same scope.

    // Load image 2
    img = await createImage('img/img-2.jpg'); //from now on I simply reasign the value to the img variable
    console.log('Image 2 loaded');
    await wait(2); //wait 2 sec
    img.style.display = 'none'; //hide img

    // Load image 3
    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2); //wait 2 sec
    img.style.display = 'none'; //hide img
  } catch (err) {
    //I can omit the (err) nut is better to keep it
    console.log(err);
  }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    /*
    I create an imgs array wich is the result of this imgArr.map(...).
    In each iteration of the array I have one img an I want to use createImg() to load that img.
    createImg() returns a promise so I need to await this promise, said so i need the callback function of 
    map() to be an async function so that I can use await on createImg()
    */
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs); /*
    now I have an array of promises and not an array of imgs, that's because an async function 
    returns always a promise and not the value that I'm intrested in. The value that I want to return is the fulfilled value of the promise that
    the async function returns
    */

    //I have to get the img elements themself out of the promise, for that i can use Promise.all()
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl); // this is an array of actual imgs

    imgsEl.forEach(img => img.classList.add('parallel')); // I assign a class to each one of the imgs in the imgsEl array
  } catch (err) {
    console.log(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
