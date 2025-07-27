interface User {
  name: string;
  color: string;
}

// const URL = 'http://localhost:3333'; // for internal

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("/getUsers");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; // or throw error again if you want to handle it upstream
  }
}

async function addUser(name:string){
  try{
    const response = await fetch(`/addUser?name=${name}&colour=${getRandomColor()}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.text)

  }catch (error) {
    console.error('Failed to add user:', error);
    return []; // or throw error again if you want to handle it upstream
  }
}


function renderUsers(users: User[]): void {
  const userList = document.getElementById('user-list');
  if (!userList) return console.log('User list element not found');

  userList.innerHTML = ''; // Clear existing content

  const boxSize = 100;
  const padding = 20;
  const columns = Math.floor(window.innerWidth / (boxSize + padding));
  
  users.forEach((user, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('userBox');
    listItem.textContent = user.name;
    listItem.style.backgroundColor = `#${user.color}`;
    listItem.style.width = boxSize + 'px';
    listItem.style.height = boxSize + 'px';
    listItem.style.position = 'absolute';

    // Calculate grid position
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = col * (boxSize + padding);
    const y = row * (boxSize + padding) + 150; // Push them down below inputs

    listItem.style.left = x + 'px';
    listItem.style.top = y + 'px';

    userList.appendChild(listItem);
  });
}

getUsers().then(users => {
  if (users && users.length > 0) {
    renderUsers(users);
  } else {
    console.log('No users found');
  }
}).catch(error => {
  console.error('Error fetching users:', error);
})

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++)
      color += letters[(Math.floor(Math.random() * 16))];

  return color;
}



document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('usernameInput') as HTMLInputElement;
  const button = document.getElementById('submitButton') as HTMLButtonElement;

  button.addEventListener('click', () => {
    const name = input.value.trim();
    if (name) {
      console.log('Submitted name:', name);
      addUser(name);
      getUsers().then(users => {
        if (users && users.length > 0) {
          renderUsers(users);
        } else {
          console.log('No users found');
        }
      }).catch(error => {
        console.error('Error fetching users:', error);
      })
      input.value = "";
    } else {
      alert('Please enter a name.');
    }
  });
});

setInterval(()=>{
  getUsers();
}, 3/*seconds*/ * 1000)