
        const ourPromise=fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')

        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson);
        })
        .catch((error) => {
         console.log("reset client error-------",error);
         });
         console.log(ourPromise);

        
         function getinSometing()
         {
        let getSomething=document.getElementById("container-left").innerHTML=ourPromise;
         console.log(getSomething);
        }
        const selecT=document.getElementsByClassName('selection');
        const repos=document.getElementById("selection")
        // fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
        //     .then(function(data){

        //     })
        //     .catch(function(error){

        //     });
         
        // fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
        //     .then((resp)=>resp.json())
        //     .then(function(data){

        //     })
renderD
        .then(function(data){
            const selecT=data.selection;
            return selecT.map(function(repos){
                let li=document.getElementsByClassName('repos-name').innerHTML=createNode('li'),
                    desc=document.getElementsByClassName('repos-description').innerHTML=createNode('disc'),
                    forks=document.getElementsByClassName('repos-forks').innerHTML=createNode('forks'),
                    updated=document.getElementsByClassName('repos-updated').innerHTML=createNode('updated');
            })
        })
