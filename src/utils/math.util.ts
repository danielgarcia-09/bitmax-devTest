export const calculateSkip = (skip = 1): number => skip > 0 ? (skip - 1) : 0

export const calculateTake = (skip = 1, take = 10): number => skip > 1 ? ((skip - 1) * take) : take;