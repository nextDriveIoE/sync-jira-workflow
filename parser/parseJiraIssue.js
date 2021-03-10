module.exports = (content) => {
    const regex = /(?<=\[)(.*?)(?=])/g;
    return content.match(regex);
}
