const createTitle = (text, titleLength = 30 ) => {
    let currentTitle = text;
    if (currentTitle.length > titleLength) {
      currentTitle = currentTitle.split(' ').slice(0, 6).join(' ');;
    }
    return currentTitle + '...';
};

module.exports = { createTitle };