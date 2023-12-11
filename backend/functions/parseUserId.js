export function parseUserId(userId) {
    let fetchFromThisId = 0;
    try {
        fetchFromThisId = parseInt(userId);
    } catch (error) {
        fetchFromThisId = null;
    }
    return fetchFromThisId;
}
