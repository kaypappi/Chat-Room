const ui=document.querySelector('.chat-list')
const newChatForm=document.querySelector('.new-chat');
const newNameForm=document.querySelector('.new-name')
const upadte_mssg= document.querySelector('.update-mssg')
const rooms=document.querySelector('.chat-rooms')

const username=localStorage.getItem('username') ? localStorage.getItem('username'): 'anon'

const chatUI= new chatUi(ui)
const chat1= new Chatroom('general',username)

newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message=newChatForm.message.value.trim()
    chat1.addChats(message)
    .then(()=>{
        newChatForm.reset()
    })
    .catch((e)=>console.log(e))
})


newNameForm.addEventListener('submit',e=>{
    e.preventDefault()
    const name=newNameForm.name.value.trim()
    chat1.updateUsername(name)
    newNameForm.reset()
    upadte_mssg.innerHTML=`Your username was updated to ${name}`
    setTimeout(()=>{
        upadte_mssg.innerHTML=''
    },3000)
})


rooms.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON' ){
        chatUI.clear()
        chat1.updateRoom(e.target.getAttribute('id'))
        chat1.getChats((data)=>{
            chatUI.render(data)
        })
    }
})


 

chat1.getChats((data)=>{
    chatUI.render(data)
})

