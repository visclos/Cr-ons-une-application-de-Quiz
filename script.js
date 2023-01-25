

//on apelle le ficher json avec fetch et on lui fait une promesse
fetch("index.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const jsonsData = data;
        console.log(jsonsData)







        // jsonsdata en tableau change en variable
        var i = 0;
        var correct = 0;

        //initialise la premier question aléatoirement
        generateQuestion(Math.floor(Math.random() * 25));
        // généré via  le tableau de jsonsData
        //récupére les élément du htlm pour les afficher
        function generateQuestion(index) {
            document.getElementById("question").innerHTML = jsonsData[index].question;
            document.getElementById("optt1").innerHTML = jsonsData[index].opt1;
            document.getElementById("optt2").innerHTML = jsonsData[index].opt2;
            document.getElementById("optt3").innerHTML = jsonsData[index].opt3;
            document.getElementById("optt4").innerHTML = jsonsData[index].opt4;
            document.getElementById("description").innerHTML = jsonsData[index].description
        }

        //on créé une fonction qui corige les questions et ajoute des points si c'est juste
        //qui remplace les boutons de réponse par li
        // puis rajoute des li   
        //et retire aussi le bouttons valider ajoute le bouton next
        const butn = document.getElementById("validerBtn")
        butn.addEventListener("click", valider)
        function valider() {

            description.className = "show"
            validerBtn.className = "hidden"
            nextBtn.className = "show"
            btnopt1.className = "hidden"

            optt1.className = "changeToLi"
            btnopt2.className = "hidden"
            optt2.className = "changeToLi"
            btnopt3.className = "hidden"
            optt3.className = "changeToLi"
            btnopt4.className = "hidden"
            optt4.className = "changeToLi"
            conteneurBlock.className = "conteneur2"

            if (document.getElementById("btnopt1").checked && jsonsData[i].opt1 == jsonsData[i].answer) {
                optt1.classList.add("colorForTrue")
                correct++

            }
            if (document.getElementById("btnopt2").checked && jsonsData[i].opt2 == jsonsData[i].answer) {
                optt2.classList.add("colorForTrue")
                correct++

            }
            if (document.getElementById("btnopt3").checked && jsonsData[i].opt3 == jsonsData[i].answer) {
                optt3.classList.add("colorForTrue")
                correct++

            }
            if (document.getElementById("btnopt4").checked && jsonsData[i].opt4 == jsonsData[i].answer) {
                optt4.classList.add("colorForTrue")
                correct++

            }
            if (document.getElementById("btnopt1").checked && jsonsData[i].opt1 != jsonsData[i].answer) {
                optt1.classList.add("colorForFalse")

            }
            if (document.getElementById("btnopt2").checked && jsonsData[i].opt2 != jsonsData[i].answer) {
                optt2.classList.add("colorForFalse")
            }
            if (document.getElementById("btnopt3").checked && jsonsData[i].opt3 != jsonsData[i].answer) {
                optt3.classList.add("colorForFalse")
            }
            if (document.getElementById("btnopt4").checked && jsonsData[i].opt4 != jsonsData[i].answer) {
                optt4.classList.add("colorForFalse")
            }
            if (jsonsData[i].opt1 === jsonsData[i].answer) {
                optt1.classList.add("colorForTrue")
            }
            if (jsonsData[i].opt2 === jsonsData[i].answer) {
                optt2.classList.add("colorForTrue")
            }
            if (jsonsData[i].opt3 === jsonsData[i].answer) {
                optt3.classList.add("colorForTrue")
            }
            if (jsonsData[i].opt4 === jsonsData[i].answer) {
                optt4.classList.add("colorForTrue")
            }

        }



        // on créé une fonction qui  montre le bouton valider  
        //et cache le bouton next ainsi que la description et les li
        const butn2 = document.getElementById("nextBtn")
        butn2.addEventListener("click", checkAnswer)
        function checkAnswer() {

            // ajoute +1 a i pour la prochaine question
            i++
            console.log(correct)

            conteneurBlock.className = "conteneur"
            validerBtn.className = "show"
            nextBtn.className = "hidden"

            btnopt1.className = "show"
            optt1.className = "show"

            btnopt2.className = "show"
            optt2.className = "show"

            btnopt3.className = "show"
            optt3.className = "show"

            btnopt4.className = "show"
            optt4.className = "show"
            description.className = "hidden"
            //si ils n'y a plus de question on retourne le score et on l'enregistre dans le localstorage
            if (jsonsData.length - 1 < i) {
               document.getElementById('classement') 
               classement.className = "classementNV"
               
                document.getElementById("conteneurBlock")
                conteneurBlock.style.display="none"
               
               
                userSCore()
                let bestUser = JSON.parse(localStorage.getItem("data"));
                
                //on trie du meilleur score au plus mauvais 
                bestUser.sort((a, b) => {
            
                    return b.score - a.score
                    
                })
                
                document.getElementById('firsPlayer').textContent = JSON.stringify(bestUser[0].name+bestUser[0].score);
                document.getElementById('2Player').innerText = JSON.stringify(bestUser[1].name + bestUser[1].score);
                document.getElementById('3Player').innerHTML = JSON.stringify(bestUser[2].name+ bestUser[2].score);
                document.getElementById('4Player').innerHTML = JSON.stringify(bestUser[3].name+ bestUser[3].score);
                document.getElementById('5Player').innerHTML = JSON.stringify(bestUser[4].name+ bestUser[4].score);
                
                
               
                
                
            }
            generateQuestion(i)
        }
        
        
        
        
        //au clik on cache l'entré du nom de lutilisateur et on montre les questions
        
            boutonName.onclick = () => {
            
                document.getElementById('fin')
                fin.style.display="none"
                document.getElementById("conteneurBlock")
                conteneurBlock.style.display="block"
                // userSCore()
               
                
            }
            //on créé une fonction qui enregistre le nom et le score de lutilisateur 
            //le score est initialement a 0
        
            function userSCore() {
                
        
                if( localStorage.getItem("data") == null) {
                    localStorage.setItem("data", "[]");
                }
        
                let user = {
                    name: nom.value,
                    score: correct
                }
                
        
                let old_data = JSON.parse(localStorage.getItem("data"));
                
                old_data.push(user);
        
                localStorage.setItem("data", JSON.stringify(old_data));
        
                
            }



        
    })

