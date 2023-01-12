const endpoints = {
    GetRepositories(user){return  `https://api.github.com/users/${user}/repos`},
    GetUser(user){return `https://api.github.com/users/${user}`}
}

const user_informations = document.querySelector('.user-information')

const user_img = document.querySelector('.user-img img')
const user_name = document.querySelector('.user-name')
const user_city = document.querySelector('.user-city')
const user_followers = document.querySelector('#followers')
const user_following = document.querySelector('#following')
const link = document.querySelector('#link')

const error_msg = document.querySelector('.error-message')

const input = document.querySelector('#search-input')


const main = document.querySelector('.projects')


const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");
console.log(postId)

const project_card = (obj)=>{
    let div = document.createElement('div')
    div.setAttribute('class','user-wrapper')
    div.innerHTML = `
    <h2>${obj.name}</h2>
    <div class="lang-wrapper">
        <i class="fa-solid fa-code"></i>
        <span>${obj.language}</span>
    </div>
    <div class="stars-forks">
        <div class="stars-wrapper">
            <span><i class="fa-solid fa-star"></i></span>
            <span>${obj.stargazers_count}</span>
        </div>
        <div class="stars-wrapper">
            <span><i class="fa-solid fa-code-fork"></i></span>
            <span>${obj.forks_count}</span>
        </div>
    </div>
    <a href="${obj.html_url}" target="_blank"><button><span>Ver codigo </span> <i class="fa-solid fa-computer"></i></button></button></a>`

    return div
}

const CreateRepList = async(user)=>{
    try{
        const resp = await fetch(endpoints.GetRepositories(user))
        const data = await resp.json()
    
        data.map(element => {
            main.appendChild(project_card(element))
        })
    }catch(e){
        console.log('error:',e)
    }
}



if(postId){
    CreateRepList(postId)
}else{

    const form = document.querySelector('form')
    
    form.onsubmit = (e)=>{
        e.preventDefault()
    
        let user = input.value;
    
        handleData(user)
        
    }

}



const show_user = ()=>{
    user_informations.classList.remove('hidden')
}

const hide_user = ()=>{
    user_informations.classList.add('hidden')
}

const error_messg = ()=>{
    error_msg.classList.add('active')
    
    setTimeout(() => {
        error_msg.classList.remove('active')
    }, 2000);
}



const setData = (obj)=>{
    user_img.setAttribute('src', obj.avatar_url)
    user_name.innerText = obj.name
    user_city.innerText = obj.location
    user_followers.innerText = obj.followers
    user_following.innerText = obj.following
    link.setAttribute('href',`/git-project/route/projects.html?id=${obj.login}`)
    return
}


const handleData = async(user)=>{
    try{
        const resp = await fetch(endpoints.GetUser(user))
        const data = await resp.json()
    
        if(data.message){
            hide_user()
            error_messg()
            return
        }
    
        show_user()
        setData(data)

    }catch(e){
        console.log('error:',e)
    }
}














