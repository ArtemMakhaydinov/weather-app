import { handleNewInput } from "./control";

export const handleSubmit = (event: Event) => {
    event.preventDefault();
    handleNewInput(null);
};
