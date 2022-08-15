export const getSettings = () => {
    return {
        city: localStorage.getItem('city'),
        unit: localStorage.getItem('unit'),
    };
}