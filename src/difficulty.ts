export interface Difficulty {
    rows: number;
    columns: number;
    mines: number;
}

const easy: Difficulty = {
    rows: 8,
    columns: 10,
    mines: 10
};

const medium: Difficulty = {
    rows: 14,
    columns: 18,
    mines: 40
};

// eslint-disable-next-line
export const difficulties: any = {
        easy: easy,
        medium: medium
    }