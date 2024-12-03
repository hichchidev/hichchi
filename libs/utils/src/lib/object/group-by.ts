// noinspection JSUnusedGlobalSymbols

/**
 * Groups an array of objects by a key.
 * @param list - Array of objects to group.
 * @param keyGetter - Function to get the key to group by.
 * @returns - Map of grouped objects.
 */
export const groupBy = <K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K | null, Array<V>> => {
    const map = new Map<K, Array<V>>();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};
