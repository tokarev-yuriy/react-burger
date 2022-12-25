export const guuid: () => number = () => {
    return (new Date()).getMilliseconds();
}