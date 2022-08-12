/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/API.ts":
/*!********************!*\
  !*** ./src/API.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWeatherData = void 0;
const getWeatherData = async (city) => {
    let data;
    try {
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5b43226f222518ddfbbd7f501ffd484c`);
        data = await forecast.json();
        if (data.cod !== 200) {
            throw data.message;
        }
        return data;
    }
    catch (err) {
        console.log(err); //TODO error handler
        return err;
    }
};
exports.getWeatherData = getWeatherData;


/***/ }),

/***/ "./src/UI.ts":
/*!*******************!*\
  !*** ./src/UI.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleSubmit = void 0;
const control_1 = __webpack_require__(/*! ./control */ "./src/control.ts");
const handleSubmit = (event) => {
    event.preventDefault();
    (0, control_1.handleNewInput)(null);
};
exports.handleSubmit = handleSubmit;


/***/ }),

/***/ "./src/control.ts":
/*!************************!*\
  !*** ./src/control.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleNewInput = void 0;
const API_1 = __webpack_require__(/*! ./API */ "./src/API.ts");
const form_1 = __webpack_require__(/*! ./form */ "./src/form.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
;
const handleForecast = async (city) => {
    const response = await (0, API_1.getWeatherData)(city);
    const forecast = Object.assign({}, response);
    (0, render_1.renderForecast)(forecast);
};
const handleNewInput = (defaultCity) => {
    let city = defaultCity ? defaultCity : (0, form_1.getFormData)();
    handleForecast(city);
};
exports.handleNewInput = handleNewInput;
/* {
    base: "stations"
clouds:
    all: 7
[[Prototype]]: Object
    cod: 200
coord:
    lat: 56.9942
    lon: 40.9858
[[Prototype]]: Object
dt: 1660236291
id: 555312
main:
    feels_like: 289.54
    grnd_level: 1009
    humidity: 60
    pressure: 1024
    sea_level: 1024
    temp: 290.21
    temp_max: 290.21
    temp_min: 290.21
[[Prototype]]: Object
name: "Ivanovo"
sys:
    country: "RU"
    sunrise: 1660181675
    sunset: 1660237690
[[Prototype]]: Object
timezone: 10800
visibility: 10000
weather: Array(1)
0: {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}
length: 1
[[Prototype]]: Array(0)
wind:
    deg: 323
    gust: 1.87
    speed: 1.88
[[Prototype]]: Object
[[Prototype]]: Object
} */


/***/ }),

/***/ "./src/form.ts":
/*!*********************!*\
  !*** ./src/form.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFormData = void 0;
const getFormData = () => {
    const form = document.querySelector('.search_form');
    const input = document.querySelector('.search_input');
    const data = new FormData(form);
    input.value = '';
    const inputValue = [...data];
    const city = inputValue[0][1].toString();
    return city;
};
exports.getFormData = getFormData;


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderForecast = void 0;
const renderLocation = (city, country) => {
    const locationH1 = document.querySelector('.content_location');
    locationH1.textContent = `${city}, ${country}`;
};
const renderDegrees = (temp) => {
    const degreesSpan = document.querySelector('.content_degrees');
    const formattedTemp = Math.round(temp).toString();
    degreesSpan.textContent = formattedTemp;
};
const renderCondition = (condition) => {
    const conditionP = document.querySelector('.condition');
    conditionP.textContent = condition[0].toUpperCase() + condition.slice(1);
};
const renderFeelsLike = (temp) => {
    const feelsLikeP = document.querySelector('.feels_like');
    const formattedTemp = Math.round(temp).toString();
    feelsLikeP.textContent = `Feels like ${formattedTemp}`;
};
const renderHumidity = (humidity) => {
    const humidityP = document.querySelector('.humidity');
    const formattedHumidity = Math.round(humidity).toString();
    humidityP.textContent = `Humidity ${formattedHumidity}%`;
};
const renderForecast = (forecast) => {
    renderLocation(forecast.name, forecast.sys.country);
    renderDegrees(forecast.main.temp);
    renderCondition(forecast.weather[0].description);
    renderFeelsLike(forecast.main.feels_like);
    renderHumidity(forecast.main.humidity);
    console.log(forecast);
};
exports.renderForecast = renderForecast;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const control_1 = __webpack_require__(/*! ./control */ "./src/control.ts");
const UI_1 = __webpack_require__(/*! ./UI */ "./src/UI.ts");
document.onload = (0, control_1.handleNewInput)('Ivanovo');
document.querySelector('.search_form')?.addEventListener('submit', UI_1.handleSubmit);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EseUZBQXlGLEtBQUs7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7OztBQ2xCVDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEIsa0JBQWtCLG1CQUFPLENBQUMsbUNBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7Ozs7Ozs7Ozs7O0FDUlA7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCO0FBQ3RCLGNBQWMsbUJBQU8sQ0FBQywyQkFBTztBQUM3QixlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0IsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7Ozs7Ozs7Ozs7QUN6RFc7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNaTjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGdDQUFnQyxLQUFLLElBQUksUUFBUTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7VUNsQ3RCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCLG1CQUFPLENBQUMsbUNBQVc7QUFDckMsYUFBYSxtQkFBTyxDQUFDLHlCQUFNO0FBQzNCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9BUEkudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvVUkudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbC50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mb3JtLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFdlYXRoZXJEYXRhID0gdm9pZCAwO1xyXG5jb25zdCBnZXRXZWF0aGVyRGF0YSA9IGFzeW5jIChjaXR5KSA9PiB7XHJcbiAgICBsZXQgZGF0YTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJkFQUElEPTViNDMyMjZmMjIyNTE4ZGRmYmJkN2Y1MDFmZmQ0ODRjYCk7XHJcbiAgICAgICAgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcclxuICAgICAgICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBkYXRhLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7IC8vVE9ETyBlcnJvciBoYW5kbGVyXHJcbiAgICAgICAgcmV0dXJuIGVycjtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5nZXRXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmhhbmRsZVN1Ym1pdCA9IHZvaWQgMDtcclxuY29uc3QgY29udHJvbF8xID0gcmVxdWlyZShcIi4vY29udHJvbFwiKTtcclxuY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgKDAsIGNvbnRyb2xfMS5oYW5kbGVOZXdJbnB1dCkobnVsbCk7XHJcbn07XHJcbmV4cG9ydHMuaGFuZGxlU3VibWl0ID0gaGFuZGxlU3VibWl0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmhhbmRsZU5ld0lucHV0ID0gdm9pZCAwO1xyXG5jb25zdCBBUElfMSA9IHJlcXVpcmUoXCIuL0FQSVwiKTtcclxuY29uc3QgZm9ybV8xID0gcmVxdWlyZShcIi4vZm9ybVwiKTtcclxuY29uc3QgcmVuZGVyXzEgPSByZXF1aXJlKFwiLi9yZW5kZXJcIik7XHJcbjtcclxuY29uc3QgaGFuZGxlRm9yZWNhc3QgPSBhc3luYyAoY2l0eSkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCAoMCwgQVBJXzEuZ2V0V2VhdGhlckRhdGEpKGNpdHkpO1xyXG4gICAgY29uc3QgZm9yZWNhc3QgPSBPYmplY3QuYXNzaWduKHt9LCByZXNwb25zZSk7XHJcbiAgICAoMCwgcmVuZGVyXzEucmVuZGVyRm9yZWNhc3QpKGZvcmVjYXN0KTtcclxufTtcclxuY29uc3QgaGFuZGxlTmV3SW5wdXQgPSAoZGVmYXVsdENpdHkpID0+IHtcclxuICAgIGxldCBjaXR5ID0gZGVmYXVsdENpdHkgPyBkZWZhdWx0Q2l0eSA6ICgwLCBmb3JtXzEuZ2V0Rm9ybURhdGEpKCk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChjaXR5KTtcclxufTtcclxuZXhwb3J0cy5oYW5kbGVOZXdJbnB1dCA9IGhhbmRsZU5ld0lucHV0O1xyXG4vKiB7XHJcbiAgICBiYXNlOiBcInN0YXRpb25zXCJcclxuY2xvdWRzOlxyXG4gICAgYWxsOiA3XHJcbltbUHJvdG90eXBlXV06IE9iamVjdFxyXG4gICAgY29kOiAyMDBcclxuY29vcmQ6XHJcbiAgICBsYXQ6IDU2Ljk5NDJcclxuICAgIGxvbjogNDAuOTg1OFxyXG5bW1Byb3RvdHlwZV1dOiBPYmplY3RcclxuZHQ6IDE2NjAyMzYyOTFcclxuaWQ6IDU1NTMxMlxyXG5tYWluOlxyXG4gICAgZmVlbHNfbGlrZTogMjg5LjU0XHJcbiAgICBncm5kX2xldmVsOiAxMDA5XHJcbiAgICBodW1pZGl0eTogNjBcclxuICAgIHByZXNzdXJlOiAxMDI0XHJcbiAgICBzZWFfbGV2ZWw6IDEwMjRcclxuICAgIHRlbXA6IDI5MC4yMVxyXG4gICAgdGVtcF9tYXg6IDI5MC4yMVxyXG4gICAgdGVtcF9taW46IDI5MC4yMVxyXG5bW1Byb3RvdHlwZV1dOiBPYmplY3RcclxubmFtZTogXCJJdmFub3ZvXCJcclxuc3lzOlxyXG4gICAgY291bnRyeTogXCJSVVwiXHJcbiAgICBzdW5yaXNlOiAxNjYwMTgxNjc1XHJcbiAgICBzdW5zZXQ6IDE2NjAyMzc2OTBcclxuW1tQcm90b3R5cGVdXTogT2JqZWN0XHJcbnRpbWV6b25lOiAxMDgwMFxyXG52aXNpYmlsaXR5OiAxMDAwMFxyXG53ZWF0aGVyOiBBcnJheSgxKVxyXG4wOiB7aWQ6IDgwMCwgbWFpbjogJ0NsZWFyJywgZGVzY3JpcHRpb246ICdjbGVhciBza3knLCBpY29uOiAnMDFkJ31cclxubGVuZ3RoOiAxXHJcbltbUHJvdG90eXBlXV06IEFycmF5KDApXHJcbndpbmQ6XHJcbiAgICBkZWc6IDMyM1xyXG4gICAgZ3VzdDogMS44N1xyXG4gICAgc3BlZWQ6IDEuODhcclxuW1tQcm90b3R5cGVdXTogT2JqZWN0XHJcbltbUHJvdG90eXBlXV06IE9iamVjdFxyXG59ICovXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0Rm9ybURhdGEgPSB2b2lkIDA7XHJcbmNvbnN0IGdldEZvcm1EYXRhID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfZm9ybScpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0Jyk7XHJcbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG4gICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBbLi4uZGF0YV07XHJcbiAgICBjb25zdCBjaXR5ID0gaW5wdXRWYWx1ZVswXVsxXS50b1N0cmluZygpO1xyXG4gICAgcmV0dXJuIGNpdHk7XHJcbn07XHJcbmV4cG9ydHMuZ2V0Rm9ybURhdGEgPSBnZXRGb3JtRGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yZW5kZXJGb3JlY2FzdCA9IHZvaWQgMDtcclxuY29uc3QgcmVuZGVyTG9jYXRpb24gPSAoY2l0eSwgY291bnRyeSkgPT4ge1xyXG4gICAgY29uc3QgbG9jYXRpb25IMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X2xvY2F0aW9uJyk7XHJcbiAgICBsb2NhdGlvbkgxLnRleHRDb250ZW50ID0gYCR7Y2l0eX0sICR7Y291bnRyeX1gO1xyXG59O1xyXG5jb25zdCByZW5kZXJEZWdyZWVzID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGRlZ3JlZXNTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRfZGVncmVlcycpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGRlZ3JlZXNTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGVtcDtcclxufTtcclxuY29uc3QgcmVuZGVyQ29uZGl0aW9uID0gKGNvbmRpdGlvbikgPT4ge1xyXG4gICAgY29uc3QgY29uZGl0aW9uUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcclxuICAgIGNvbmRpdGlvblAudGV4dENvbnRlbnQgPSBjb25kaXRpb25bMF0udG9VcHBlckNhc2UoKSArIGNvbmRpdGlvbi5zbGljZSgxKTtcclxufTtcclxuY29uc3QgcmVuZGVyRmVlbHNMaWtlID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGZlZWxzTGlrZVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHNfbGlrZScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGZlZWxzTGlrZVAudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2Zvcm1hdHRlZFRlbXB9YDtcclxufTtcclxuY29uc3QgcmVuZGVySHVtaWRpdHkgPSAoaHVtaWRpdHkpID0+IHtcclxuICAgIGNvbnN0IGh1bWlkaXR5UCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkSHVtaWRpdHkgPSBNYXRoLnJvdW5kKGh1bWlkaXR5KS50b1N0cmluZygpO1xyXG4gICAgaHVtaWRpdHlQLnRleHRDb250ZW50ID0gYEh1bWlkaXR5ICR7Zm9ybWF0dGVkSHVtaWRpdHl9JWA7XHJcbn07XHJcbmNvbnN0IHJlbmRlckZvcmVjYXN0ID0gKGZvcmVjYXN0KSA9PiB7XHJcbiAgICByZW5kZXJMb2NhdGlvbihmb3JlY2FzdC5uYW1lLCBmb3JlY2FzdC5zeXMuY291bnRyeSk7XHJcbiAgICByZW5kZXJEZWdyZWVzKGZvcmVjYXN0Lm1haW4udGVtcCk7XHJcbiAgICByZW5kZXJDb25kaXRpb24oZm9yZWNhc3Qud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XHJcbiAgICByZW5kZXJGZWVsc0xpa2UoZm9yZWNhc3QubWFpbi5mZWVsc19saWtlKTtcclxuICAgIHJlbmRlckh1bWlkaXR5KGZvcmVjYXN0Lm1haW4uaHVtaWRpdHkpO1xyXG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlckZvcmVjYXN0ID0gcmVuZGVyRm9yZWNhc3Q7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb250cm9sXzEgPSByZXF1aXJlKFwiLi9jb250cm9sXCIpO1xyXG5jb25zdCBVSV8xID0gcmVxdWlyZShcIi4vVUlcIik7XHJcbmRvY3VtZW50Lm9ubG9hZCA9ICgwLCBjb250cm9sXzEuaGFuZGxlTmV3SW5wdXQpKCdJdmFub3ZvJyk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBVSV8xLmhhbmRsZVN1Ym1pdCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==