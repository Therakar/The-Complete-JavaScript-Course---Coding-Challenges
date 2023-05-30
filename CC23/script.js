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

// Selects the place where i want the img to be appended
const imgContainer = document.querySelector('.images');

// createImage is a function that takes an imgPath
const createImage = function (imgPath) {
  // Whenever we are promisifying something I need to return a new Promise with an executor function that recives a resolve function and a reject function
  return new Promise((resolve, reject) => {
    // Creates a new img
    const img = document.createElement('img');
    // Passes an src to the img
    img.src = imgPath;

    // Adds an event listener at the load of the img
    img.addEventListener('load', function () {
      // Appends the img to the element I selected
      imgContainer.append(img);

      // Now I need to resolve the promise, because now we are in the 'load' event and that means that loading the immage was succesful. The resolve value is the img
      resolve(img);
    });
    // Now I need to listen to the 'error' event, in this case I need to reject the promise with a new Error
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg; // Global variable

// Now I'm handling the succesful promise

// I pass the imgPath of the first img in createImage()
createImage('img/img-1.jpg')
  // Here I'm receving the img as the resolve value
  .then(img => {
    currentImg = img; // I set the global variable = to img so that i can use it in the next fuction, where img is not defined
    console.log('Immage 1 loaded');
    return wait(2); // Makes pass 2 seconds
  })
  // wait() doesn't have any resolve value so I don't specify any argument/parameter in this function.
  // Notice that img is not defined in this function but only in the previous one, so I need a global variable (currentImg).
  .then(() => {
    // This hides the first img
    currentImg.style.display = 'none';

    // I pass the imgPath of the second img in createImage(), doing that I'm creating another promise
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img; // I again set the global variable = to img
    console.log('Immage 2 loaded');
    return wait(2); // Makes pass 2 seconds
  })
  .then(() => {
    // This hides the second img
    currentImg.style.display = 'none';

    // I pass the imgPath of the third img in createImage(), doing that I'm creating another promise
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img; // I again set the global variable = to img
    console.log('Immage 3 loaded');
    return wait(2); // Makes pass 2 seconds
  })
  .then(() => {
    // Hides the third img
    currentImg.style.display = 'none';
  })
  // Catch handler
  .catch(err => console.error(err));
