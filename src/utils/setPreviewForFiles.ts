import { AudioPreview, ImagePreview } from "../types";

export function setPreviewForFiles(files: File[]): ImagePreview[] {
    return files.map(f => ({
        size: f.size,
        src: URL.createObjectURL(f),
    }));
}

export function getSingleImagePreview(file: File | null): ImagePreview {
    return {
        size: file ? file.size : 0,
        src: file ? URL.createObjectURL(file) : '',
    };
}

export function setSoundtracksPreviewForFiles(files: File[]): AudioPreview[] {
    return files.map(f => ({
        size: f.size,
        src: URL.createObjectURL(f),
        composer: '',
        title: '',
    }));
}

// export function setPreviewForData(images: Img[]): ImagePreview[] {
//     return images.map(i => ({
//         alt: i.alt || '',
//         size: 0,
//         src: `${HOST_ADDRESS}/images/${i.src}`,
//     }));
// }