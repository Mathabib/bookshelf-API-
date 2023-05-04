let aray = [

{
    nama: 'jak',
    kelas: 12,
    alamat: 'bandung dicoding'
},

{
    nama: 'juki',
    kelas: 12,
    alamat: 'bandung'
},

{
    nama: 'jekik',
    kelas: 12,
    alamat: 'jakarta'
},

{
    nama: 'jakot',
    kelas: 12,
    alamat: 'Jakarta dicoding'
},


]

const kata = 'kelas Dicoding,  kursus dicoding , aku cinta dicoding'

const pilih = 'DICODING'
// const found = aray.filter(((ray) => ray.alamat.match('jakarta')), ((ray2) => ray2.alamat.match('jakarta')) );
const found = aray.filter((bio) =>bio.alamat.includes('dicoding'))
// const found = kata.match(/dicoding/i)

console.log(pilih.toLowerCase())
console.log(found)