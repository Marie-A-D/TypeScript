"use strict";
//on récupère les éléments HTML afin de les manipuler = QuerySelector
const btnSubmit = document.querySelector(".todo-btn");
const inputTask = document.querySelector(".todo-input");
const formTask = document.querySelector(".todo-form");
const taskList = document.querySelector(".todo-list");
const btnDeleteAll = document.querySelector(".todo-delete-all");
//On crée un tableau pour stocker toutes nos nouvelles tâches
const tasks = JSON.parse(localStorage.getItem("task") || "[]");
//Fonction qui sauvegarde les éléments dans le local Storage
const saveTasks = () => {
    localStorage.setItem("task", JSON.stringify(tasks));
};
//Ajouter les nouvelles tâches ou démarrage du DOM
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => appendTask(task));
});
const handleSubmit = (e) => {
    e.preventDefault(); //Cela évite à ma page de se rafraîchir
    //création d'un nouvel objet new task
    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    };
    //Sauvegarde la tâche dans le localStrorage
    tasks.push(newTask);
    //ajout de la fonction appendTask
    appendTask(newTask);
    //Sauvegarder l'envoi des tâche dans le localStorage
    saveTasks();
    //Vider l'input
    inputTask.value = "";
};
//On va gérer l'EventListener sur le form
formTask.addEventListener("submit", e => handleSubmit(e));
// fonction d'Ajout d'une nouvelle tâche
const appendTask = (newTask) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement("input");
    const btnDel = document.createElement("button");
    btnDel.classList.add("todo-delete-one");
    btnDel.textContent = "X";
    checkB.type = "checkbox";
    checkB.checked = newTask.completed;
    if (newTask.completed === true) {
        newLi.style.textDecoration = "line-through";
    }
    else {
        newLi.style.textDecoration = "none";
    }
    checkB.addEventListener("change", () => {
        // console.log("Vérification");
        newTask.completed = checkB.checked;
        if (newTask.completed === true) {
            newLi.style.textDecoration = "line-through";
        }
        else {
            newLi.style.textDecoration = "none";
        }
        saveTasks();
    });
    newLi.append(checkB, newTask.task, btnDel);
    taskList.prepend(newLi); //pour que la tâche la plus réscente reste en haut
    btnDel.addEventListener("click", () => {
        newLi.remove();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task == newTask.task) {
                tasks.splice(i, 1);
            }
            saveTasks();
        }
    });
};
//Bouton TOUT EFFACER
const clearTasks = () => {
    const confirmDel = confirm("Etes-vous sur de vouloir tout effacer ?");
    if (confirmDel === true) {
        tasks.length = 0;
        saveTasks();
        taskList.textContent = "";
    }
};
btnDeleteAll.addEventListener("click", clearTasks);
