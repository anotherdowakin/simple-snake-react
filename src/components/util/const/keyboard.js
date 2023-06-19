export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_LEFT = 'ArrowLeft';
export const SPACE = 'Space';
export const ESCAPE = 'Escape';

export const OPPOSITE_KEYS = new Map()
    .set(ARROW_UP, ARROW_DOWN)
    .set(ARROW_LEFT, ARROW_RIGHT)
    .set(ARROW_DOWN, ARROW_UP)
    .set(ARROW_RIGHT, ARROW_LEFT);
