function pageUpdate() {
    if (userEmail) {
        $.ajax({
            url: `http://146.185.154.90:8000/blog/${userEmail}/posts`,
        }).then(data => {
            data = data.slice(-20)
            let post = $('.container-post').empty()
            for (let i = data.length - 1; i >= 0; i--) {
                let card = $("<div class='post'>")
                card.append(
                    `<p class="post-name">${data[i].user.firstName} - ${data[i].user.email} said:</p>
                    <p class="post-content">${data[i].message
                    }</p>`
                )

                post.append(card)
            }
        })
    }
}


const intervalId = setInterval(
    pageUpdate, 5000)


$("#message-form").submit(function(event) {
    event.preventDefault();

    var formData = {
        message: $("#message").val()
    };

    if (userEmail) {
        $.ajax({
                type: "POST",
                url: `http://146.185.154.90:8000/blog/${userEmail}/posts`,
                data: formData,
                dataType: "json",
                encode: true
            })
            .then(() => {
                pageUpdate()
                $("#message").val('')
            })
            .fail(function(error) {
                alert("Ошибка при отправке запроса: " + JSON.stringify(error));
            });
    }
});