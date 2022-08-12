export const getFormData = (): string => {
    const form: HTMLFormElement = document.querySelector('.search_form')!;
    const input: HTMLInputElement = document.querySelector('.search_input')!;
    const data = new FormData(form);
    input.value = '';
    const inputValue = [...data];
    const city = inputValue[0][1].toString();
    return city;
}