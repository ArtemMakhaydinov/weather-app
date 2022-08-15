import {loadFreshPage, handleNewInput, handleUnitChange } from "./control";

window.onload = loadFreshPage;

document.querySelector('.search_form')?.addEventListener('submit', handleNewInput);
document.querySelectorAll('.unit_button').forEach(e => e.addEventListener('click', handleUnitChange));
