/*
write fn to construct book obj that accept and retain info about title author pagecount whether you have read the book and also a method that returns all this
info in a concise string
no interface
input = title, author, pg, read or not
output = obj
write obj constructor
*/

function Book(title,author,pgCount) {
    this.title = title,
    this.author = author,
    this.pgCount = pgCount
    this.printInfo = () => title + " by " + author + ", " + pgCount + "pgs"
}