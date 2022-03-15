const colors = ["yellow","red","blue","orange","green","purple","yellow"];
function getPoke() {
    const list = document.getElementById("pokemons")
    const img = document.getElementById("img")
    const current = list.value;
    const pokeName = document.getElementById("pokeName")
    const statName = document.getElementById("statName")
    const statValue = document.getElementById("statValue")
    const ability = document.getElementById("ability")
    const hiddenAbility = document.getElementById("secretAblity")
   const pokeType = document.getElementById("pokeType");
    console.log(statName.style)
    const colorId = document.querySelectorAll(`option[value=${current}]`)[0].id;
    document.documentElement.style.setProperty("--color", colors[colorId]);
   
    fetch(`https://pokeapi.co/api/v2/pokemon/${current}`)
        .then(response => response.json())
        .then(data => {
             pokeType.innerHTML = data.types[0].type.name.toUpperCase();
            img.innerHTML = `<img src="${data.sprites.versions["generation-v"]["black-white"].animated["front_default"]}"></img>`;
            pokeName.innerHTML = `<p>${data.name.toUpperCase()}</p>`
            statName.innerHTML = data.stats.map((value) => `<p>${value.stat.name.toUpperCase()} : </p>`).join("");
            statValue.innerHTML = data.stats.map((value) => `<p> ${value.base_stat}</p>`).join("");
            let notHidden = data.abilities[0].ability.name;
            let hidden = "";
            data.abilities.some((value) => {
                if (value.is_hidden == true) {
                    hidden = value.ability.name;
                    return true;
                }
            });
            ability.innerHTML = `<p>Ability:</p><p>${notHidden}</p>`;
            hiddenAbility.innerHTML = `<p>Hidden Ability:</p><p>${hidden == "" ? "-": hidden}</p>`
            console.log(notHidden);

        }).catch(err => console.log(err));
}