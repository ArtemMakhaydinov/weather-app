import { handleNewInput } from "./control";
import { handleSubmit} from "./UI";


document.onload = handleNewInput('Ivanovo')!;
document.querySelector('.search_form')?.addEventListener('submit', handleSubmit);
