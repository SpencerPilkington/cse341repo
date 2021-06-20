const fetch = require('node-fetch');


exports.getPokemon = (req,res,next) => {
    offset = (req.params.page - 1) * 10;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const pokemon1 = data.results[0];
        const pokemon2 = data.results[1];
        const pokemon3 = data.results[2];
        const pokemon4 = data.results[3];
        const pokemon5 = data.results[4];
        const pokemon6 = data.results[5];
        const pokemon7 = data.results[6];
        const pokemon8 = data.results[7];
        const pokemon9 = data.results[8];
        const pokemon10 = data.results[9];
        res.render('pages/prove09', {
            title: 'Pokemon',
            path: '/prove09',
            p1: pokemon1.name,
            p2: pokemon2.name,
            p3: pokemon3.name,
            p4: pokemon4.name,
            p5: pokemon5.name,
            p6: pokemon6.name,
            p7: pokemon7.name,
            p8: pokemon8.name,
            p9: pokemon9.name,
            p10: pokemon10.name

        });
    })
    .catch(err => console.log(err));
};