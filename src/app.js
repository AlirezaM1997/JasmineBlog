

const submitBLog = async () => {
    console.log('salam salam')
    fetch('http://localhost:4000/blog/write', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ut eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNjQ3MDY5MzkyOTU4MjE5MTM0IiwiaWF0IjoxNjQ3MDcxNjA2fQ.Al5NI7LEv2Qp2ND8SMpnaPPcVGMY-VWU4IFRx3rRwwc'
      },
      body: JSON.stringify({
        title: 'salam',
        content: '<h1> Hello World </h1>',
        imgurl: 'lol'
      })
    }).then(() => {
      console.log('!!!!')
    })
  }
  
  
  const submitUser = async () => {
    fetch('http://localhost:4000/user/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imgurl: 'https://cdn.dribbble.com/users/1450667/screenshots/4051283/media/62151c53fa1e540097ee035759e27d08.jpg?compress=1&resize=400x300&vertical=top',
        username: 'jixer',
        name: 'ali jixer'
      })
    }).then(() => {
      console.log('!!!!')
    })
  }
  // submitBLog()
  // submitUser()
  
  const login = async () => {
    fetch('http://localhost:4000/user/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'jixer',
        password: '1111'
      })
    }).then((data) => {
      console.log(data)
      console.log('!!!!')
      return data.json()
    }).then(({token}) => console.log(token))
  }
  // login()
  
  const me = async () => {
    fetch('http://localhost:4000/user/me', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ut eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNjQ3MDY5MzkyOTU4MjE5MTM0IiwiaWF0IjoxNjQ3MDcxNjA2fQ.Al5NI7LEv2Qp2ND8SMpnaPPcVGMY-VWU4IFRx3rRwwc'
  
      },
      body: JSON.stringify({})
    }).then((data) => {
      console.log(data)
      console.log('!!!!')
      return data.json()
    }).then(data => console.log(data))
  }
  // me()
  
  const editBlog = async () => {
    console.log('salam salam')
    fetch('http://localhost:4000/blog/edit', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ut eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNjQ3MDY5MzkyOTU4MjE5MTM0IiwiaWF0IjoxNjQ3MDcxNjA2fQ.Al5NI7LEv2Qp2ND8SMpnaPPcVGMY-VWU4IFRx3rRwwc'
      },
      body: JSON.stringify({
        blogId: '1647085780238592429',
        data: {
          title: 'salam',
          content: '<h1> Hello World !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! </h1>',
          imgurl: 'lol'
        }
  
      })
    }).then(() => {
      console.log('!!!!')
    })
  }
  
  // editBlog()
  const editUser = async () => {
    console.log('salam salam')
    fetch('http://localhost:4000/user/edit', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': 'ut eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNjQ3MDY5MzkyOTU4MjE5MTM0IiwiaWF0IjoxNjQ3MDcxNjA2fQ.Al5NI7LEv2Qp2ND8SMpnaPPcVGMY-VWU4IFRx3rRwwc'
      },
      body: JSON.stringify({
        data: {
          title: 'salam',
          content: '<h1> Hello World !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! </h1>',
          name: 'ali jixer2',
          phoneNumber: '09391971073',
          imgurl: 'sommaye naro'
        }
  
      })
    }).then(() => {
      console.log('!!!!')
    })
  }
  editUser()