// из iso делаю нормальную дату 
function parsDate(data) {
    let date = new Date(data)

    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let formattedDate = monthNames[date.getMonth()] + " " +
                   date.getDate() + " | " +
                   date.getHours() + ":" +
                   (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return formattedDate
}


// происходит запрос на посты
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
                    `<p class="post-name">${data[i].user.lastName} ${data[i].user.firstName} said:</p>
                    <p class="post-content">${data[i].message}</p>
                    <p class="post-content" style="text-align: end;">${parsDate(data[i].datetime)}</p>`
                )
                post.append(card)
            }
        })
    }
}


// делаю интервал запросов на посты
const intervalId = setInterval(
    pageUpdate, 5000)


// делаю проверку на нажатие отправки сообщения и отправляю его
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