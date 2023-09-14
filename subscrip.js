$("#follow").submit(function(event) {
    event.preventDefault();
    email_user = $("#followEmail")
    let formData = { email: email_user.val().replace(/\s+/g, '') }
    $.ajax({
        type: "POST",
        url: `http://146.185.154.90:8000/blog/${userEmail}/subscribe`,
        data: formData,
        dataType: "json",
        encode: true
    }).then(data => {
        console.log(data)
        if (data.error) {
            alert(data.error)
        } else {
            alert(`Вы подписались на\n
            ${email_user.val()}`)
        }
        $("#followEmail").val('')
    })
})