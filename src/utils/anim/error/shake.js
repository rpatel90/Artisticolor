module.exports = function() {
    Array.from(arguments).forEach(element => {
        element.classList.add('error')
        setTimeout(() => element.classList.remove('error'), 500)
    });
}