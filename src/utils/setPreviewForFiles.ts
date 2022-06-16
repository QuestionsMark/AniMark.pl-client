import { ImagePreview } from "../types";

export function setPreviewForFiles(files: File[]): ImagePreview[] {
    return files.map(f => ({
        size: f.size,
        src: URL.createObjectURL(f),
    }));
}

// export function setPreviewForData(images: Img[]): ImagePreview[] {
//     return images.map(i => ({
//         alt: i.alt || '',
//         size: 0,
//         src: `${HOST_ADDRESS}/images/${i.src}`,
//     }));
// }