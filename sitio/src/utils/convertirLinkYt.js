//convertir link youtube a link iframe
const youtubeLink = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    var match = url.match(regExp)
    return (match&&match[7].length==11)? match[7] : false
}

/* console.log('https://www.youtube.com/embed/'+ youtubeLink(link)); */

module.exports = youtubeLink; 