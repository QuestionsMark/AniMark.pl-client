import { ImagePreview } from "../types";

export const imageEditValidation = (image: ImagePreview) => {
    const errors: string[] = [];
    if (!image) return ['Nie wykryto zmian.'];
    const { size, src } = image;

    if (src.slice(0, 5) !== 'blob:') {
        errors.push('Nie wykryto zmian.');
    }

    if (size > 524288) {
        errors.push('Grafika nie może przekraczać 0.5MB.');
    }

    return errors;
};