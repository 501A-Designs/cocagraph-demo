import { writable } from 'svelte/store';

export const metaData = writable({
    name: 'untitled',
    date: ''
});
export const textArray = writable([]);
export const connectionArray = writable([]);
export const zoneArray = writable([]);
export const isDragging = writable(false);
// export const textArray = writable([]);
