const form = document.querySelector("form");
const newItem = document.getElementById("new-item");
const addBtn = document.getElementById("add-btn");

// Validação para aceitar apenas palavras (letras, espaços e acentos)
newItem.addEventListener("input", () => {
    const hasTextRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
    const inputValue = newItem.value;
    
    if (!hasTextRegex.test(inputValue)) {
        // Se contiver caracteres não permitidos, remove-os
        newItem.value = inputValue.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, '');
    }

    console.log(inputValue)
    
    // Habilita ou desabilita o botão com base se há texto válido
    addBtn.disabled = newItem.value.trim() === '';
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    addItem();
    newItem.focus();
    newItem.value = "";
})

function addItem(){
    // Captura o valor digitado no input, remove espaços desnecessários no início e no final da string e atribui a uma variável chamada itemText
    const itemText = newItem.value.trim();

    if(itemText){
        const li = document.createElement("li");
        li.classList.add("shopping-item");
        li.innerHTML = `
            <input type="checkbox" class="item-checkbox">
            <span class="item-text">${itemText}</span>
            <button class="remove-btn"><i class="fas fa-trash"></i></button>
        `;
        
        // Adiciona evento de clique ao botão de remover
        const removeButton = li.querySelector(".remove-btn");
        removeButton.addEventListener("click", removeItem);
        
        // Adiciona o item criado (li) à lista de compras (shopping-list)
        const shoppingList = document.getElementById("shopping-list");
        shoppingList.appendChild(li);
        // Limpa o valor do input para que possa ser digitado um novo item
        newItem.value = "";
    }

    // Retorna o foco para o input, para que o usuário possa continuar digitando sem precisar clicar novamente nele
    newItem.focus();
}

// Adiciona um ouvinte de evento para o botão de remoção
function removeItem(event){
    const eventTarget = event.target;
    
    // Se o clique foi no ícone dentro do botão
    if(eventTarget.tagName === "I" && eventTarget.parentElement.classList.contains("remove-btn")){
        // Sobe dois níveis: do ícone para o botão, e do botão para o <li>
        eventTarget.parentElement.parentElement.remove();
        showNotification();
    }
    // Se o clique foi diretamente no botão
    else if(eventTarget.classList.contains("remove-btn")){
        // Sobe um nível: do botão para o <li>
        eventTarget.parentElement.remove();
        showNotification();
    }
}

function showNotification(){
    const notification = document.getElementById("notification");
    notification.classList.add("show");
    const closeNotification = document.querySelector(".close-notification");

    closeNotification.addEventListener("click", () => {
        notification.classList.remove("show");
    });
}
