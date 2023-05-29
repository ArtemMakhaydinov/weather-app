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
const getWeatherData = async (city, unit) => {
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=5b43226f222518ddfbbd7f501ffd484c`);
    const data = await forecast.json();
    return data;
};
exports.getWeatherData = getWeatherData;


/***/ }),

/***/ "./src/control.ts":
/*!************************!*\
  !*** ./src/control.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadFreshPage = exports.handleUnitChange = exports.handleNewInput = void 0;
const API_1 = __webpack_require__(/*! ./API */ "./src/API.ts");
const form_1 = __webpack_require__(/*! ./form */ "./src/form.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
const storage_1 = __webpack_require__(/*! ./storage */ "./src/storage.ts");
let lastCity = 'Ivanovo';
let currentUnit = 'metric';
;
const handleForecast = async (city) => {
    try {
        const response = await (0, API_1.getWeatherData)(city, currentUnit);
        if (response.cod !== 200) {
            throw response.message;
        }
        ;
        const forecast = Object.assign({}, response);
        lastCity = forecast.name;
        localStorage.setItem('city', lastCity);
        (0, render_1.renderForecast)(forecast);
        (0, render_1.renderTemperatureUnit)(currentUnit);
        (0, render_1.renderUnitButtons)(currentUnit);
    }
    catch (error) {
        (0, render_1.renderError)(error);
    }
    ;
};
const handleNewInput = (event) => {
    event.preventDefault();
    let city = (0, form_1.getFormData)();
    handleForecast(city);
};
exports.handleNewInput = handleNewInput;
const handleUnitChange = function () {
    if (currentUnit === this.dataset.unit) {
        return;
    }
    ;
    currentUnit = this.dataset.unit;
    localStorage.setItem('unit', currentUnit);
    (0, render_1.renderTemperatureUnit)(currentUnit);
    (0, render_1.renderUnitButtons)(currentUnit);
    handleForecast(lastCity);
};
exports.handleUnitChange = handleUnitChange;
const handleLocalSettings = () => {
    const localSettings = (0, storage_1.getSettings)();
    if (localSettings.city) {
        lastCity = localSettings.city;
    }
    ;
    if (localSettings.unit) {
        currentUnit = localSettings.unit;
    }
    ;
};
const loadFreshPage = () => {
    handleLocalSettings();
    handleForecast(lastCity);
};
exports.loadFreshPage = loadFreshPage;


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
exports.renderForecast = exports.renderTemperatureUnit = exports.renderUnitButtons = exports.renderError = void 0;
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
const renderError = (message) => {
    const alert = document.querySelector('.search_alert');
    const formattedMessage = message.toString();
    alert.textContent = formattedMessage;
};
exports.renderError = renderError;
const renderUnitButtons = (unit) => {
    const buttons = document.querySelectorAll('.unit_button').forEach(e => {
        e.classList.remove('pressed');
    });
    const button = document.querySelector(`.${unit}`);
    button.classList.add('pressed');
};
exports.renderUnitButtons = renderUnitButtons;
const renderTemperatureUnit = (unit) => {
    const temperatureUnit = document.querySelector('.content_degrees_units');
    if (unit === 'metric') {
        temperatureUnit.textContent = '°C';
    }
    ;
    if (unit === 'imperial') {
        temperatureUnit.textContent = '°F';
    }
    ;
};
exports.renderTemperatureUnit = renderTemperatureUnit;
const renderForecast = (forecast) => {
    (0, exports.renderError)('');
    renderLocation(forecast.name, forecast.sys.country);
    renderDegrees(forecast.main.temp);
    renderCondition(forecast.weather[0].description);
    renderFeelsLike(forecast.main.feels_like);
    renderHumidity(forecast.main.humidity);
};
exports.renderForecast = renderForecast;


/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = void 0;
const getSettings = () => {
    return {
        city: localStorage.getItem('city'),
        unit: localStorage.getItem('unit'),
    };
};
exports.getSettings = getSettings;


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
window.onload = control_1.loadFreshPage;
document.querySelector('.search_form')?.addEventListener('submit', control_1.handleNewInput);
document.querySelectorAll('.unit_button').forEach(e => e.addEventListener('click', control_1.handleUnitChange));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQSxzRkFBc0YsS0FBSyxTQUFTLEtBQUs7QUFDekc7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7OztBQ1JUO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixHQUFHLHdCQUF3QixHQUFHLHNCQUFzQjtBQUN6RSxjQUFjLG1CQUFPLENBQUMsMkJBQU87QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLGlDQUFVO0FBQ25DLGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOzs7Ozs7Ozs7OztBQzlEUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQ1pOO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQixHQUFHLDZCQUE2QixHQUFHLHlCQUF5QixHQUFHLG1CQUFtQjtBQUN4RztBQUNBO0FBQ0EsZ0NBQWdDLEtBQUssSUFBSSxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msa0JBQWtCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsOENBQThDLEtBQUs7QUFDbkQ7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7Ozs7O0FDNURUO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7VUNUbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNyQztBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9BUEkudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbC50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mb3JtLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3JlbmRlci50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdG9yYWdlLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0V2VhdGhlckRhdGEgPSB2b2lkIDA7XHJcbmNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgKGNpdHksIHVuaXQpID0+IHtcclxuICAgIGNvbnN0IGZvcmVjYXN0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz0ke3VuaXR9JkFQUElEPTViNDMyMjZmMjIyNTE4ZGRmYmJkN2Y1MDFmZmQ0ODRjYCk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZm9yZWNhc3QuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn07XHJcbmV4cG9ydHMuZ2V0V2VhdGhlckRhdGEgPSBnZXRXZWF0aGVyRGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5sb2FkRnJlc2hQYWdlID0gZXhwb3J0cy5oYW5kbGVVbml0Q2hhbmdlID0gZXhwb3J0cy5oYW5kbGVOZXdJbnB1dCA9IHZvaWQgMDtcclxuY29uc3QgQVBJXzEgPSByZXF1aXJlKFwiLi9BUElcIik7XHJcbmNvbnN0IGZvcm1fMSA9IHJlcXVpcmUoXCIuL2Zvcm1cIik7XHJcbmNvbnN0IHJlbmRlcl8xID0gcmVxdWlyZShcIi4vcmVuZGVyXCIpO1xyXG5jb25zdCBzdG9yYWdlXzEgPSByZXF1aXJlKFwiLi9zdG9yYWdlXCIpO1xyXG5sZXQgbGFzdENpdHkgPSAnSXZhbm92byc7XHJcbmxldCBjdXJyZW50VW5pdCA9ICdtZXRyaWMnO1xyXG47XHJcbmNvbnN0IGhhbmRsZUZvcmVjYXN0ID0gYXN5bmMgKGNpdHkpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCAoMCwgQVBJXzEuZ2V0V2VhdGhlckRhdGEpKGNpdHksIGN1cnJlbnRVbml0KTtcclxuICAgICAgICBpZiAocmVzcG9uc2UuY29kICE9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2UubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0ID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzcG9uc2UpO1xyXG4gICAgICAgIGxhc3RDaXR5ID0gZm9yZWNhc3QubmFtZTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2l0eScsIGxhc3RDaXR5KTtcclxuICAgICAgICAoMCwgcmVuZGVyXzEucmVuZGVyRm9yZWNhc3QpKGZvcmVjYXN0KTtcclxuICAgICAgICAoMCwgcmVuZGVyXzEucmVuZGVyVGVtcGVyYXR1cmVVbml0KShjdXJyZW50VW5pdCk7XHJcbiAgICAgICAgKDAsIHJlbmRlcl8xLnJlbmRlclVuaXRCdXR0b25zKShjdXJyZW50VW5pdCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAoMCwgcmVuZGVyXzEucmVuZGVyRXJyb3IpKGVycm9yKTtcclxuICAgIH1cclxuICAgIDtcclxufTtcclxuY29uc3QgaGFuZGxlTmV3SW5wdXQgPSAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgY2l0eSA9ICgwLCBmb3JtXzEuZ2V0Rm9ybURhdGEpKCk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChjaXR5KTtcclxufTtcclxuZXhwb3J0cy5oYW5kbGVOZXdJbnB1dCA9IGhhbmRsZU5ld0lucHV0O1xyXG5jb25zdCBoYW5kbGVVbml0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGN1cnJlbnRVbml0ID09PSB0aGlzLmRhdGFzZXQudW5pdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIDtcclxuICAgIGN1cnJlbnRVbml0ID0gdGhpcy5kYXRhc2V0LnVuaXQ7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndW5pdCcsIGN1cnJlbnRVbml0KTtcclxuICAgICgwLCByZW5kZXJfMS5yZW5kZXJUZW1wZXJhdHVyZVVuaXQpKGN1cnJlbnRVbml0KTtcclxuICAgICgwLCByZW5kZXJfMS5yZW5kZXJVbml0QnV0dG9ucykoY3VycmVudFVuaXQpO1xyXG4gICAgaGFuZGxlRm9yZWNhc3QobGFzdENpdHkpO1xyXG59O1xyXG5leHBvcnRzLmhhbmRsZVVuaXRDaGFuZ2UgPSBoYW5kbGVVbml0Q2hhbmdlO1xyXG5jb25zdCBoYW5kbGVMb2NhbFNldHRpbmdzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbG9jYWxTZXR0aW5ncyA9ICgwLCBzdG9yYWdlXzEuZ2V0U2V0dGluZ3MpKCk7XHJcbiAgICBpZiAobG9jYWxTZXR0aW5ncy5jaXR5KSB7XHJcbiAgICAgICAgbGFzdENpdHkgPSBsb2NhbFNldHRpbmdzLmNpdHk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBpZiAobG9jYWxTZXR0aW5ncy51bml0KSB7XHJcbiAgICAgICAgY3VycmVudFVuaXQgPSBsb2NhbFNldHRpbmdzLnVuaXQ7XHJcbiAgICB9XHJcbiAgICA7XHJcbn07XHJcbmNvbnN0IGxvYWRGcmVzaFBhZ2UgPSAoKSA9PiB7XHJcbiAgICBoYW5kbGVMb2NhbFNldHRpbmdzKCk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChsYXN0Q2l0eSk7XHJcbn07XHJcbmV4cG9ydHMubG9hZEZyZXNoUGFnZSA9IGxvYWRGcmVzaFBhZ2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0Rm9ybURhdGEgPSB2b2lkIDA7XHJcbmNvbnN0IGdldEZvcm1EYXRhID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfZm9ybScpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX2lucHV0Jyk7XHJcbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xyXG4gICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBbLi4uZGF0YV07XHJcbiAgICBjb25zdCBjaXR5ID0gaW5wdXRWYWx1ZVswXVsxXS50b1N0cmluZygpO1xyXG4gICAgcmV0dXJuIGNpdHk7XHJcbn07XHJcbmV4cG9ydHMuZ2V0Rm9ybURhdGEgPSBnZXRGb3JtRGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yZW5kZXJGb3JlY2FzdCA9IGV4cG9ydHMucmVuZGVyVGVtcGVyYXR1cmVVbml0ID0gZXhwb3J0cy5yZW5kZXJVbml0QnV0dG9ucyA9IGV4cG9ydHMucmVuZGVyRXJyb3IgPSB2b2lkIDA7XHJcbmNvbnN0IHJlbmRlckxvY2F0aW9uID0gKGNpdHksIGNvdW50cnkpID0+IHtcclxuICAgIGNvbnN0IGxvY2F0aW9uSDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudF9sb2NhdGlvbicpO1xyXG4gICAgbG9jYXRpb25IMS50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcclxufTtcclxuY29uc3QgcmVuZGVyRGVncmVlcyA9ICh0ZW1wKSA9PiB7XHJcbiAgICBjb25zdCBkZWdyZWVzU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X2RlZ3JlZXMnKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZFRlbXAgPSBNYXRoLnJvdW5kKHRlbXApLnRvU3RyaW5nKCk7XHJcbiAgICBkZWdyZWVzU3Bhbi50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFRlbXA7XHJcbn07XHJcbmNvbnN0IHJlbmRlckNvbmRpdGlvbiA9IChjb25kaXRpb24pID0+IHtcclxuICAgIGNvbnN0IGNvbmRpdGlvblAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XHJcbiAgICBjb25kaXRpb25QLnRleHRDb250ZW50ID0gY29uZGl0aW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBjb25kaXRpb24uc2xpY2UoMSk7XHJcbn07XHJcbmNvbnN0IHJlbmRlckZlZWxzTGlrZSA9ICh0ZW1wKSA9PiB7XHJcbiAgICBjb25zdCBmZWVsc0xpa2VQID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzX2xpa2UnKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZFRlbXAgPSBNYXRoLnJvdW5kKHRlbXApLnRvU3RyaW5nKCk7XHJcbiAgICBmZWVsc0xpa2VQLnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtmb3JtYXR0ZWRUZW1wfWA7XHJcbn07XHJcbmNvbnN0IHJlbmRlckh1bWlkaXR5ID0gKGh1bWlkaXR5KSA9PiB7XHJcbiAgICBjb25zdCBodW1pZGl0eVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHknKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZEh1bWlkaXR5ID0gTWF0aC5yb3VuZChodW1pZGl0eSkudG9TdHJpbmcoKTtcclxuICAgIGh1bWlkaXR5UC50ZXh0Q29udGVudCA9IGBIdW1pZGl0eSAke2Zvcm1hdHRlZEh1bWlkaXR5fSVgO1xyXG59O1xyXG5jb25zdCByZW5kZXJFcnJvciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICBjb25zdCBhbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfYWxlcnQnKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZE1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICBhbGVydC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZE1lc3NhZ2U7XHJcbn07XHJcbmV4cG9ydHMucmVuZGVyRXJyb3IgPSByZW5kZXJFcnJvcjtcclxuY29uc3QgcmVuZGVyVW5pdEJ1dHRvbnMgPSAodW5pdCkgPT4ge1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bml0X2J1dHRvbicpLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgZS5jbGFzc0xpc3QucmVtb3ZlKCdwcmVzc2VkJyk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3VuaXR9YCk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgncHJlc3NlZCcpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlclVuaXRCdXR0b25zID0gcmVuZGVyVW5pdEJ1dHRvbnM7XHJcbmNvbnN0IHJlbmRlclRlbXBlcmF0dXJlVW5pdCA9ICh1bml0KSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wZXJhdHVyZVVuaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudF9kZWdyZWVzX3VuaXRzJyk7XHJcbiAgICBpZiAodW5pdCA9PT0gJ21ldHJpYycpIHtcclxuICAgICAgICB0ZW1wZXJhdHVyZVVuaXQudGV4dENvbnRlbnQgPSAnwrBDJztcclxuICAgIH1cclxuICAgIDtcclxuICAgIGlmICh1bml0ID09PSAnaW1wZXJpYWwnKSB7XHJcbiAgICAgICAgdGVtcGVyYXR1cmVVbml0LnRleHRDb250ZW50ID0gJ8KwRic7XHJcbiAgICB9XHJcbiAgICA7XHJcbn07XHJcbmV4cG9ydHMucmVuZGVyVGVtcGVyYXR1cmVVbml0ID0gcmVuZGVyVGVtcGVyYXR1cmVVbml0O1xyXG5jb25zdCByZW5kZXJGb3JlY2FzdCA9IChmb3JlY2FzdCkgPT4ge1xyXG4gICAgKDAsIGV4cG9ydHMucmVuZGVyRXJyb3IpKCcnKTtcclxuICAgIHJlbmRlckxvY2F0aW9uKGZvcmVjYXN0Lm5hbWUsIGZvcmVjYXN0LnN5cy5jb3VudHJ5KTtcclxuICAgIHJlbmRlckRlZ3JlZXMoZm9yZWNhc3QubWFpbi50ZW1wKTtcclxuICAgIHJlbmRlckNvbmRpdGlvbihmb3JlY2FzdC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcclxuICAgIHJlbmRlckZlZWxzTGlrZShmb3JlY2FzdC5tYWluLmZlZWxzX2xpa2UpO1xyXG4gICAgcmVuZGVySHVtaWRpdHkoZm9yZWNhc3QubWFpbi5odW1pZGl0eSk7XHJcbn07XHJcbmV4cG9ydHMucmVuZGVyRm9yZWNhc3QgPSByZW5kZXJGb3JlY2FzdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRTZXR0aW5ncyA9IHZvaWQgMDtcclxuY29uc3QgZ2V0U2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNpdHk6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5JyksXHJcbiAgICAgICAgdW5pdDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VuaXQnKSxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydHMuZ2V0U2V0dGluZ3MgPSBnZXRTZXR0aW5ncztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnRyb2xfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xcIik7XHJcbndpbmRvdy5vbmxvYWQgPSBjb250cm9sXzEubG9hZEZyZXNoUGFnZTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGNvbnRyb2xfMS5oYW5kbGVOZXdJbnB1dCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bml0X2J1dHRvbicpLmZvckVhY2goZSA9PiBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbF8xLmhhbmRsZVVuaXRDaGFuZ2UpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9