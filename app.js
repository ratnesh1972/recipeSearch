//UI Vars
const form = document.getElementById("form");
const root = document.getElementById("root");

const type = "public";
const app_id = "44079f49";
const app_key = "d007546b2d9b1188bd59a3ff5b3b57de";


form.addEventListener('submit', (e) => {
    //Prevent default action on form submission.
    e.preventDefault();

    //Get value for query, meal type and cuisine type.
    const query = e.target.content.value;
    const mealType = e.target.meal_type.value;
    const cuisineType = e.target.cuisine_type.value;

    //call loadData for current search.
    loadData(query, mealType, cuisineType);

    //Reset the form fields.
    e.target.reset();
});

const loadData = async (query, mealType, cuisineType) => {
    try {
        const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=${type}&q=${query}&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}&cuisineType=${cuisineType}`);
        const data = await res.json();
        console.log(data);
        displayCards(data.hits);
    } catch (error) {
        console.log(error.message);
    }
}

const displayCards = (data) => {
    console.log(data);
    if (data.length !== 0) {
        let output = `<div class="row py-5">`;
        data.forEach(recipe => {
            let mealType = ``
            recipe.recipe.mealType.forEach((meal) => { mealType += `<span class="badge bg-info mr-2">${meal.toUpperCase()}</span>` });

            let cuisineType = ``
            recipe.recipe.cuisineType.forEach((cuisine) => { cuisineType += `<span class="badge bg-danger mr-2">${cuisine.toUpperCase()}</span>` })

            output += `<div class="col-md-4 mb-5 p-4">
            <div class="card">
                <img class="card-img" src=${recipe.recipe.image} width="100%" height="100%">
                <div class="card-body">
                    <h5 class="card-title">${recipe.recipe.label}</h5>
                </div>
                <div class="card-body">
                    <p>Meal Type : ${mealType}</p>
                    <p>Cuisine Type : ${cuisineType}</p>
                </div>
                <div class="card-body">
                    <a href=${recipe.recipe.url} class="card-link" target="_blank">View Full Recipe</a>
                </div>
            </div>
        </div>`
        });

        output += `</div>`;
        root.innerHTML = output;
    } else {
        root.innerHTML = '<p class="text-center">No recipes found for this search.... :( </p>'
    }
}