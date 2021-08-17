const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const total = blogs
    .map(x => x.likes)
    .reduce((x, y) =>  x + y)
    console.log(total)

    return total
}

const favoriteBlog = (blogs) => {
    const fav = blogs
    .map(x => x.likes)

    const max = Math.max(...fav)
    const final = blogs.filter(x => x.likes === max)
    const trueFinal = final[0]

    console.log('fav: ', fav)
    console.log('finalfav: ', final)
    return trueFinal
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}