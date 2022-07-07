import { ImagePreview } from "../types";

export const profileBackgroundsAddValidation = (images: ImagePreview[], customBackgrounds: string[]) => {
    const errors: string[] = [];
    if (images.length === 0) return ['Nie wykryto zmian.'];

    let imageErrorsCount = 0;
    for (const { size, src } of images) {
        if (typeof size !== 'number' || size > 524288 || typeof src !== 'string' || src.length < 1) {
            imageErrorsCount += 1;
        }
    }
    if (imageErrorsCount > 0) {
        errors.push(`Grafiki powinny ważyć nie więcej niż 0,5MB. Ilosć nieprawidłowych grafik: ${imageErrorsCount}`);
    }

    if (customBackgrounds.length + images.length > 5) {
        errors.push('Można posiadać maksymalnie 5 teł.');
    }

    return errors;
};