export const getColor = (size: number, limit: number) => {
    if (size > limit) return '#a13000';
    return '#00a156';
};

export const getSize = (size: number) => {
    return (size / 1048576).toFixed(2)
};