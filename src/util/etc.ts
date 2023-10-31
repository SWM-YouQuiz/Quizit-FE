export const calculateDateDifference = (DateA: Date, DateB: Date) => {
    const diffInMilliseconds: number = DateA.getTime() - DateB.getTime();

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    return diffInDays;
};
