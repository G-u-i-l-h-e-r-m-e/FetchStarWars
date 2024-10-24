carregarPlaneta();

window.onload = function () {
    var url = "https://swapi.dev/api/planets";

    var planetas = document.getElementById('planetas');

    // Função para buscar o clima
    function buscarPlaneta() {
        var planeta = planetas.value; // Obtém o valor da entrada

        if (planeta != "0") {
            var completeUrl = `https://swapi.dev/api/planets/${planeta}/`;

            fetch(completeUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Nome: " + data.name);
                    console.log("População: " + data.population);
                    console.log("Clima: " + data.climate);

                    // Exibir resultado na div
                    document.getElementById('resultadoPlaneta').innerHTML = `
                        <p><strong>Nome:</strong> ${data.name}</p>
                        <p><strong>População:</strong> ${data.population}</p>
                        <p><strong>Clima:</strong> ${data.climate}</p>
                    `;
                })
                .catch(error => {
                    console.error("Houve um problema:", error);
                });
        }
    }

    document.getElementById('planetas').addEventListener('change', buscarPlaneta);
}

function carregarPlaneta() {
    var completeUrl = "https://swapi.dev/api/planets";

    fetch(completeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var select = document.getElementById('planetas');
            
            select.innerHTML = '';

            // Percorre cada planeta no array de resultados
            data.results.forEach((planet, index) => {
                var novaOpcao = document.createElement('option');
                novaOpcao.text = planet.name; 
                novaOpcao.value = index + 1; // Usar o índice como valor
                select.add(novaOpcao);
            });
        })
        .catch(error => {
            console.error("Houve um problema:", error);
        });
}
