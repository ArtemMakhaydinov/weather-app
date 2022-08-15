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
    console.log(unit);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQSxzRkFBc0YsS0FBSyxTQUFTLEtBQUs7QUFDekc7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7OztBQ1JUO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHFCQUFxQixHQUFHLHdCQUF3QixHQUFHLHNCQUFzQjtBQUN6RSxjQUFjLG1CQUFPLENBQUMsMkJBQU87QUFDN0IsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLGlDQUFVO0FBQ25DLGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOzs7Ozs7Ozs7OztBQzlEUjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQ1pOO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQixHQUFHLDZCQUE2QixHQUFHLHlCQUF5QixHQUFHLG1CQUFtQjtBQUN4RztBQUNBO0FBQ0EsZ0NBQWdDLEtBQUssSUFBSSxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msa0JBQWtCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsS0FBSztBQUNuRDtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUM3RFQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7OztVQ1RuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixtQkFBTyxDQUFDLG1DQUFXO0FBQ3JDO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL0FQSS50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRXZWF0aGVyRGF0YSA9IHZvaWQgMDtcclxuY29uc3QgZ2V0V2VhdGhlckRhdGEgPSBhc3luYyAoY2l0eSwgdW5pdCkgPT4ge1xyXG4gICAgY29uc3QgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPSR7dW5pdH0mQVBQSUQ9NWI0MzIyNmYyMjI1MThkZGZiYmQ3ZjUwMWZmZDQ4NGNgKTtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmb3JlY2FzdC5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxufTtcclxuZXhwb3J0cy5nZXRXZWF0aGVyRGF0YSA9IGdldFdlYXRoZXJEYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmxvYWRGcmVzaFBhZ2UgPSBleHBvcnRzLmhhbmRsZVVuaXRDaGFuZ2UgPSBleHBvcnRzLmhhbmRsZU5ld0lucHV0ID0gdm9pZCAwO1xyXG5jb25zdCBBUElfMSA9IHJlcXVpcmUoXCIuL0FQSVwiKTtcclxuY29uc3QgZm9ybV8xID0gcmVxdWlyZShcIi4vZm9ybVwiKTtcclxuY29uc3QgcmVuZGVyXzEgPSByZXF1aXJlKFwiLi9yZW5kZXJcIik7XHJcbmNvbnN0IHN0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL3N0b3JhZ2VcIik7XHJcbmxldCBsYXN0Q2l0eSA9ICdJdmFub3ZvJztcclxubGV0IGN1cnJlbnRVbml0ID0gJ21ldHJpYyc7XHJcbjtcclxuY29uc3QgaGFuZGxlRm9yZWNhc3QgPSBhc3luYyAoY2l0eSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0ICgwLCBBUElfMS5nZXRXZWF0aGVyRGF0YSkoY2l0eSwgY3VycmVudFVuaXQpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5jb2QgIT09IDIwMCkge1xyXG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICA7XHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3QgPSBPYmplY3QuYXNzaWduKHt9LCByZXNwb25zZSk7XHJcbiAgICAgICAgbGFzdENpdHkgPSBmb3JlY2FzdC5uYW1lO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaXR5JywgbGFzdENpdHkpO1xyXG4gICAgICAgICgwLCByZW5kZXJfMS5yZW5kZXJGb3JlY2FzdCkoZm9yZWNhc3QpO1xyXG4gICAgICAgICgwLCByZW5kZXJfMS5yZW5kZXJUZW1wZXJhdHVyZVVuaXQpKGN1cnJlbnRVbml0KTtcclxuICAgICAgICAoMCwgcmVuZGVyXzEucmVuZGVyVW5pdEJ1dHRvbnMpKGN1cnJlbnRVbml0KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICgwLCByZW5kZXJfMS5yZW5kZXJFcnJvcikoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgO1xyXG59O1xyXG5jb25zdCBoYW5kbGVOZXdJbnB1dCA9IChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBjaXR5ID0gKDAsIGZvcm1fMS5nZXRGb3JtRGF0YSkoKTtcclxuICAgIGhhbmRsZUZvcmVjYXN0KGNpdHkpO1xyXG59O1xyXG5leHBvcnRzLmhhbmRsZU5ld0lucHV0ID0gaGFuZGxlTmV3SW5wdXQ7XHJcbmNvbnN0IGhhbmRsZVVuaXRDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoY3VycmVudFVuaXQgPT09IHRoaXMuZGF0YXNldC51bml0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgY3VycmVudFVuaXQgPSB0aGlzLmRhdGFzZXQudW5pdDtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1bml0JywgY3VycmVudFVuaXQpO1xyXG4gICAgKDAsIHJlbmRlcl8xLnJlbmRlclRlbXBlcmF0dXJlVW5pdCkoY3VycmVudFVuaXQpO1xyXG4gICAgKDAsIHJlbmRlcl8xLnJlbmRlclVuaXRCdXR0b25zKShjdXJyZW50VW5pdCk7XHJcbiAgICBoYW5kbGVGb3JlY2FzdChsYXN0Q2l0eSk7XHJcbn07XHJcbmV4cG9ydHMuaGFuZGxlVW5pdENoYW5nZSA9IGhhbmRsZVVuaXRDaGFuZ2U7XHJcbmNvbnN0IGhhbmRsZUxvY2FsU2V0dGluZ3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsb2NhbFNldHRpbmdzID0gKDAsIHN0b3JhZ2VfMS5nZXRTZXR0aW5ncykoKTtcclxuICAgIGlmIChsb2NhbFNldHRpbmdzLmNpdHkpIHtcclxuICAgICAgICBsYXN0Q2l0eSA9IGxvY2FsU2V0dGluZ3MuY2l0eTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIGlmIChsb2NhbFNldHRpbmdzLnVuaXQpIHtcclxuICAgICAgICBjdXJyZW50VW5pdCA9IGxvY2FsU2V0dGluZ3MudW5pdDtcclxuICAgIH1cclxuICAgIDtcclxufTtcclxuY29uc3QgbG9hZEZyZXNoUGFnZSA9ICgpID0+IHtcclxuICAgIGhhbmRsZUxvY2FsU2V0dGluZ3MoKTtcclxuICAgIGhhbmRsZUZvcmVjYXN0KGxhc3RDaXR5KTtcclxufTtcclxuZXhwb3J0cy5sb2FkRnJlc2hQYWdlID0gbG9hZEZyZXNoUGFnZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRGb3JtRGF0YSA9IHZvaWQgMDtcclxuY29uc3QgZ2V0Rm9ybURhdGEgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9mb3JtJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfaW5wdXQnKTtcclxuICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IFsuLi5kYXRhXTtcclxuICAgIGNvbnN0IGNpdHkgPSBpbnB1dFZhbHVlWzBdWzFdLnRvU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gY2l0eTtcclxufTtcclxuZXhwb3J0cy5nZXRGb3JtRGF0YSA9IGdldEZvcm1EYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJlbmRlckZvcmVjYXN0ID0gZXhwb3J0cy5yZW5kZXJUZW1wZXJhdHVyZVVuaXQgPSBleHBvcnRzLnJlbmRlclVuaXRCdXR0b25zID0gZXhwb3J0cy5yZW5kZXJFcnJvciA9IHZvaWQgMDtcclxuY29uc3QgcmVuZGVyTG9jYXRpb24gPSAoY2l0eSwgY291bnRyeSkgPT4ge1xyXG4gICAgY29uc3QgbG9jYXRpb25IMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50X2xvY2F0aW9uJyk7XHJcbiAgICBsb2NhdGlvbkgxLnRleHRDb250ZW50ID0gYCR7Y2l0eX0sICR7Y291bnRyeX1gO1xyXG59O1xyXG5jb25zdCByZW5kZXJEZWdyZWVzID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGRlZ3JlZXNTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRfZGVncmVlcycpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGRlZ3JlZXNTcGFuLnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGVtcDtcclxufTtcclxuY29uc3QgcmVuZGVyQ29uZGl0aW9uID0gKGNvbmRpdGlvbikgPT4ge1xyXG4gICAgY29uc3QgY29uZGl0aW9uUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcclxuICAgIGNvbmRpdGlvblAudGV4dENvbnRlbnQgPSBjb25kaXRpb25bMF0udG9VcHBlckNhc2UoKSArIGNvbmRpdGlvbi5zbGljZSgxKTtcclxufTtcclxuY29uc3QgcmVuZGVyRmVlbHNMaWtlID0gKHRlbXApID0+IHtcclxuICAgIGNvbnN0IGZlZWxzTGlrZVAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHNfbGlrZScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVGVtcCA9IE1hdGgucm91bmQodGVtcCkudG9TdHJpbmcoKTtcclxuICAgIGZlZWxzTGlrZVAudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2Zvcm1hdHRlZFRlbXB9YDtcclxufTtcclxuY29uc3QgcmVuZGVySHVtaWRpdHkgPSAoaHVtaWRpdHkpID0+IHtcclxuICAgIGNvbnN0IGh1bWlkaXR5UCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkSHVtaWRpdHkgPSBNYXRoLnJvdW5kKGh1bWlkaXR5KS50b1N0cmluZygpO1xyXG4gICAgaHVtaWRpdHlQLnRleHRDb250ZW50ID0gYEh1bWlkaXR5ICR7Zm9ybWF0dGVkSHVtaWRpdHl9JWA7XHJcbn07XHJcbmNvbnN0IHJlbmRlckVycm9yID0gKG1lc3NhZ2UpID0+IHtcclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9hbGVydCcpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkTWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIGFsZXJ0LnRleHRDb250ZW50ID0gZm9ybWF0dGVkTWVzc2FnZTtcclxufTtcclxuZXhwb3J0cy5yZW5kZXJFcnJvciA9IHJlbmRlckVycm9yO1xyXG5jb25zdCByZW5kZXJVbml0QnV0dG9ucyA9ICh1bml0KSA9PiB7XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuaXRfYnV0dG9uJykuZm9yRWFjaChlID0+IHtcclxuICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXNzZWQnKTtcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2codW5pdCk7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1bml0fWApO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3ByZXNzZWQnKTtcclxufTtcclxuZXhwb3J0cy5yZW5kZXJVbml0QnV0dG9ucyA9IHJlbmRlclVuaXRCdXR0b25zO1xyXG5jb25zdCByZW5kZXJUZW1wZXJhdHVyZVVuaXQgPSAodW5pdCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcGVyYXR1cmVVbml0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRfZGVncmVlc191bml0cycpO1xyXG4gICAgaWYgKHVuaXQgPT09ICdtZXRyaWMnKSB7XHJcbiAgICAgICAgdGVtcGVyYXR1cmVVbml0LnRleHRDb250ZW50ID0gJ8KwQyc7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBpZiAodW5pdCA9PT0gJ2ltcGVyaWFsJykge1xyXG4gICAgICAgIHRlbXBlcmF0dXJlVW5pdC50ZXh0Q29udGVudCA9ICfCsEYnO1xyXG4gICAgfVxyXG4gICAgO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlclRlbXBlcmF0dXJlVW5pdCA9IHJlbmRlclRlbXBlcmF0dXJlVW5pdDtcclxuY29uc3QgcmVuZGVyRm9yZWNhc3QgPSAoZm9yZWNhc3QpID0+IHtcclxuICAgICgwLCBleHBvcnRzLnJlbmRlckVycm9yKSgnJyk7XHJcbiAgICByZW5kZXJMb2NhdGlvbihmb3JlY2FzdC5uYW1lLCBmb3JlY2FzdC5zeXMuY291bnRyeSk7XHJcbiAgICByZW5kZXJEZWdyZWVzKGZvcmVjYXN0Lm1haW4udGVtcCk7XHJcbiAgICByZW5kZXJDb25kaXRpb24oZm9yZWNhc3Qud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XHJcbiAgICByZW5kZXJGZWVsc0xpa2UoZm9yZWNhc3QubWFpbi5mZWVsc19saWtlKTtcclxuICAgIHJlbmRlckh1bWlkaXR5KGZvcmVjYXN0Lm1haW4uaHVtaWRpdHkpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlckZvcmVjYXN0ID0gcmVuZGVyRm9yZWNhc3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0U2V0dGluZ3MgPSB2b2lkIDA7XHJcbmNvbnN0IGdldFNldHRpbmdzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaXR5OiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2l0eScpLFxyXG4gICAgICAgIHVuaXQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1bml0JyksXHJcbiAgICB9O1xyXG59O1xyXG5leHBvcnRzLmdldFNldHRpbmdzID0gZ2V0U2V0dGluZ3M7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb250cm9sXzEgPSByZXF1aXJlKFwiLi9jb250cm9sXCIpO1xyXG53aW5kb3cub25sb2FkID0gY29udHJvbF8xLmxvYWRGcmVzaFBhZ2U7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBjb250cm9sXzEuaGFuZGxlTmV3SW5wdXQpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5pdF9idXR0b24nKS5mb3JFYWNoKGUgPT4gZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xfMS5oYW5kbGVVbml0Q2hhbmdlKSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==