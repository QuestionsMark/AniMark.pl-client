export type Color = 'RED' | 'GREEN' | 'ORANGE' | 'SPECIAL' | 'MAIN' | 'WHITE';

export const getColor = (color: Color) => {
    switch (color) {
        case 'GREEN':
            return '#63b963';
        case 'MAIN':
            return '#f50057';
        case 'ORANGE':
            return '#e6620a';
        case 'RED':
            return '#e66565';
        case 'SPECIAL':
            return '#ffb700';
        case 'WHITE':
            return '#f0f0f0';
    }
};