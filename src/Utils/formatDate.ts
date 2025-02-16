export const formatDate = (date: string) => {
    const dateObj = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
    return dateObj.format(new Date(date));
}
