export const getValidationMessage = (message: string, validation: string[] | undefined): string => {
    if (validation) {
        return `${message} ${validation.join(', ')}`;
    }
    return message;
};