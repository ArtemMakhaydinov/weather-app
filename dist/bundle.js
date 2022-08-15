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
    const forecast = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=5b43226f222518ddfbbd7f501ffd484c`);
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
    (0, render_1.renderUnitButtons)(this);
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
const renderUnitButtons = (button) => {
    const buttons = document.querySelectorAll('.unit_button').forEach(e => {
        e.classList.remove('pressed');
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQSxxRkFBcUYsS0FBSyxTQUFTLEtBQUs7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7OztBQ1JUO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixHQUFHLHdCQUF3QixHQUFHLHNCQUFzQjtBQUN6RSxjQUFjLG1CQUFPLENBQUMsMkJBQU87QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLGlDQUFVO0FBQ25DLGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7O0FDNURSO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDWk47QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLEdBQUcsNkJBQTZCLEdBQUcseUJBQXlCLEdBQUcsbUJBQW1CO0FBQ3hHO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSyxJQUFJLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsY0FBYztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxrQkFBa0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUMzRFQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7OztVQ1RuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL0FQSS50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRXZWF0aGVyRGF0YSA9IHZvaWQgMDtcclxuY29uc3QgZ2V0V2VhdGhlckRhdGEgPSBhc3luYyAoY2l0eSwgdW5pdCkgPT4ge1xyXG4gICAgY29uc3QgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHt1bml0fSZBUFBJRD01YjQzMjI2ZjIyMjUxOGRkZmJiZDdmNTAxZmZkNDg0Y2ApO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG59O1xyXG5leHBvcnRzLmdldFdlYXRoZXJEYXRhID0gZ2V0V2VhdGhlckRhdGE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubG9hZEZyZXNoUGFnZSA9IGV4cG9ydHMuaGFuZGxlVW5pdENoYW5nZSA9IGV4cG9ydHMuaGFuZGxlTmV3SW5wdXQgPSB2b2lkIDA7XHJcbmNvbnN0IEFQSV8xID0gcmVxdWlyZShcIi4vQVBJXCIpO1xyXG5jb25zdCBmb3JtXzEgPSByZXF1aXJlKFwiLi9mb3JtXCIpO1xyXG5jb25zdCByZW5kZXJfMSA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKTtcclxuY29uc3Qgc3RvcmFnZV8xID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcclxubGV0IGxhc3RDaXR5ID0gJ0l2YW5vdm8nO1xyXG5sZXQgY3VycmVudFVuaXQgPSAnbWV0cmljJztcclxuO1xyXG5jb25zdCBoYW5kbGVGb3JlY2FzdCA9IGFzeW5jIChjaXR5KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgKDAsIEFQSV8xLmdldFdlYXRoZXJEYXRhKShjaXR5LCBjdXJyZW50VW5pdCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmNvZCAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICBjb25zdCBmb3JlY2FzdCA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3BvbnNlKTtcclxuICAgICAgICBsYXN0Q2l0eSA9IGZvcmVjYXN0Lm5hbWU7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NpdHknLCBsYXN0Q2l0eSk7XHJcbiAgICAgICAgKDAsIHJlbmRlcl8xLnJlbmRlckZvcmVjYXN0KShmb3JlY2FzdCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAoMCwgcmVuZGVyXzEucmVuZGVyRXJyb3IpKGVycm9yKTtcclxuICAgIH1cclxuICAgIDtcclxufTtcclxuY29uc3QgaGFuZGxlTmV3SW5wdXQgPSAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgY2l0eSA9ICgwLCBmb3JtXzEuZ2V0Rm9ybURhdGEpKCk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChjaXR5KTtcclxufTtcclxuZXhwb3J0cy5oYW5kbGVOZXdJbnB1dCA9IGhhbmRsZU5ld0lucHV0O1xyXG5jb25zdCBoYW5kbGVVbml0Q2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGN1cnJlbnRVbml0ID09PSB0aGlzLmRhdGFzZXQudW5pdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIDtcclxuICAgIGN1cnJlbnRVbml0ID0gdGhpcy5kYXRhc2V0LnVuaXQ7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndW5pdCcsIGN1cnJlbnRVbml0KTtcclxuICAgICgwLCByZW5kZXJfMS5yZW5kZXJUZW1wZXJhdHVyZVVuaXQpKGN1cnJlbnRVbml0KTtcclxuICAgICgwLCByZW5kZXJfMS5yZW5kZXJVbml0QnV0dG9ucykodGhpcyk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChsYXN0Q2l0eSk7XHJcbn07XHJcbmV4cG9ydHMuaGFuZGxlVW5pdENoYW5nZSA9IGhhbmRsZVVuaXRDaGFuZ2U7XHJcbmNvbnN0IGhhbmRsZUxvY2FsU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsb2NhbFNldHRpbmdzID0gKDAsIHN0b3JhZ2VfMS5nZXRTZXR0aW5ncykoKTtcclxuICAgIGlmIChsb2NhbFNldHRpbmdzLmNpdHkpIHtcclxuICAgICAgICBsYXN0Q2l0eSA9IGxvY2FsU2V0dGluZ3MuY2l0eTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIGlmIChsb2NhbFNldHRpbmdzLnVuaXQpIHtcclxuICAgICAgICBjdXJyZW50VW5pdCA9IGxvY2FsU2V0dGluZ3MudW5pdDtcclxuICAgIH1cclxuICAgIDtcclxufTtcclxuY29uc3QgbG9hZEZyZXNoUGFnZSA9ICgpID0+IHtcclxuICAgIGhhbmRsZUxvY2FsU2V0dGluZ3MoKTtcclxuICAgIGhhbmRsZUZvcmVjYXN0KGxhc3RDaXR5KTtcclxufTtcclxuZXhwb3J0cy5sb2FkRnJlc2hQYWdlID0gbG9hZEZyZXNoUGFnZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRGb3JtRGF0YSA9IHZvaWQgMDtcclxuY29uc3QgZ2V0Rm9ybURhdGEgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9mb3JtJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKTtcclxuICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IFsuLi5kYXRhXTtcclxuICAgIGNvbnN0IGNpdHkgPSBpbnB1dFZhbHVlWzBdWzFdLnRvU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gY2l0eTtcclxufTtcclxuZXhwb3J0cy5nZXRGb3JtRGF0YSA9IGdldEZvcm1EYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJlbmRlckZvcmVjYXN0ID0gZXhwb3J0cy5yZW5kZXJUZW1wZXJhdHVyZVVuaXQgPSBleHBvcnRzLnJlbmRlclVuaXRCdXR0b25zID0gZXhwb3J0cy5yZW5kZXJFcnJvciA9IHZvaWQgMDtcclxuY29uc3QgcmVuZGVyTG9jYXRpb24gPSAoY2l0eSwgY291bnRyeSkgPT4ge1xyXG4gICAgY29uc3QgbG9jYXRpb25IMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X2xvY2F0aW9uJyk7XHJcbiAgICBsb2NhdGlvbkgxLnRleHRDb250ZW50ID0gYCR7Y2l0eX0sICR7Y291bnRyeX1gO1xyXG59O1xyXG5jb25zdCByZW5kZXJEZWdyZWVzID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGRlZ3JlZXNTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRfZGVncmVlcycpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGRlZ3JlZXNTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGVtcDtcclxufTtcclxuY29uc3QgcmVuZGVyQ29uZGl0aW9uID0gKGNvbmRpdGlvbikgPT4ge1xyXG4gICAgY29uc3QgY29uZGl0aW9uUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcclxuICAgIGNvbmRpdGlvblAudGV4dENvbnRlbnQgPSBjb25kaXRpb25bMF0udG9VcHBlckNhc2UoKSArIGNvbmRpdGlvbi5zbGljZSgxKTtcclxufTtcclxuY29uc3QgcmVuZGVyRmVlbHNMaWtlID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGZlZWxzTGlrZVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHNfbGlrZScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGZlZWxzTGlrZVAudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2Zvcm1hdHRlZFRlbXB9YDtcclxufTtcclxuY29uc3QgcmVuZGVySHVtaWRpdHkgPSAoaHVtaWRpdHkpID0+IHtcclxuICAgIGNvbnN0IGh1bWlkaXR5UCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkSHVtaWRpdHkgPSBNYXRoLnJvdW5kKGh1bWlkaXR5KS50b1N0cmluZygpO1xyXG4gICAgaHVtaWRpdHlQLnRleHRDb250ZW50ID0gYEh1bWlkaXR5ICR7Zm9ybWF0dGVkSHVtaWRpdHl9JWA7XHJcbn07XHJcbmNvbnN0IHJlbmRlckVycm9yID0gKG1lc3NhZ2UpID0+IHtcclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9hbGVydCcpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkTWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIGFsZXJ0LnRleHRDb250ZW50ID0gZm9ybWF0dGVkTWVzc2FnZTtcclxufTtcclxuZXhwb3J0cy5yZW5kZXJFcnJvciA9IHJlbmRlckVycm9yO1xyXG5jb25zdCByZW5kZXJVbml0QnV0dG9ucyA9IChidXR0b24pID0+IHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5pdF9idXR0b24nKS5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZSgncHJlc3NlZCcpO1xyXG4gICAgfSk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgncHJlc3NlZCcpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlclVuaXRCdXR0b25zID0gcmVuZGVyVW5pdEJ1dHRvbnM7XHJcbmNvbnN0IHJlbmRlclRlbXBlcmF0dXJlVW5pdCA9ICh1bml0KSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wZXJhdHVyZVVuaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudF9kZWdyZWVzX3VuaXRzJyk7XHJcbiAgICBpZiAodW5pdCA9PT0gJ21ldHJpYycpIHtcclxuICAgICAgICB0ZW1wZXJhdHVyZVVuaXQudGV4dENvbnRlbnQgPSAnwrBDJztcclxuICAgIH1cclxuICAgIDtcclxuICAgIGlmICh1bml0ID09PSAnaW1wZXJpYWwnKSB7XHJcbiAgICAgICAgdGVtcGVyYXR1cmVVbml0LnRleHRDb250ZW50ID0gJ8KwRic7XHJcbiAgICB9XHJcbiAgICA7XHJcbn07XHJcbmV4cG9ydHMucmVuZGVyVGVtcGVyYXR1cmVVbml0ID0gcmVuZGVyVGVtcGVyYXR1cmVVbml0O1xyXG5jb25zdCByZW5kZXJGb3JlY2FzdCA9IChmb3JlY2FzdCkgPT4ge1xyXG4gICAgKDAsIGV4cG9ydHMucmVuZGVyRXJyb3IpKCcnKTtcclxuICAgIHJlbmRlckxvY2F0aW9uKGZvcmVjYXN0Lm5hbWUsIGZvcmVjYXN0LnN5cy5jb3VudHJ5KTtcclxuICAgIHJlbmRlckRlZ3JlZXMoZm9yZWNhc3QubWFpbi50ZW1wKTtcclxuICAgIHJlbmRlckNvbmRpdGlvbihmb3JlY2FzdC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcclxuICAgIHJlbmRlckZlZWxzTGlrZShmb3JlY2FzdC5tYWluLmZlZWxzX2xpa2UpO1xyXG4gICAgcmVuZGVySHVtaWRpdHkoZm9yZWNhc3QubWFpbi5odW1pZGl0eSk7XHJcbn07XHJcbmV4cG9ydHMucmVuZGVyRm9yZWNhc3QgPSByZW5kZXJGb3JlY2FzdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRTZXR0aW5ncyA9IHZvaWQgMDtcclxuY29uc3QgZ2V0U2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNpdHk6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaXR5JyksXHJcbiAgICAgICAgdW5pdDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VuaXQnKSxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydHMuZ2V0U2V0dGluZ3MgPSBnZXRTZXR0aW5ncztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnRyb2xfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xcIik7XHJcbndpbmRvdy5vbmxvYWQgPSBjb250cm9sXzEubG9hZEZyZXNoUGFnZTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGNvbnRyb2xfMS5oYW5kbGVOZXdJbnB1dCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bml0X2J1dHRvbicpLmZvckVhY2goZSA9PiBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbF8xLmhhbmRsZVVuaXRDaGFuZ2UpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9