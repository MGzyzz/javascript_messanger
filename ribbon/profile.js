$.ajax({
    url: "http://146.185.154.90:8000/blog/john.doe@gmail.com/posts",
}).then(data => {
    data = data.slice(-20)
    for(i of data){
        console.log(i.user.name, i.message )
    }
})