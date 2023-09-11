$.ajax({
    url: "http://146.185.154.90:8000/blog/john.doe@gmail.com/posts",
}).then(data => {
    console.log(data.slice(-20))
})