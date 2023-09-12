$(document).ready(function() {
    const userEmail = 'john.doe@gmail.com';
    const apiUrl = `http://146.185.154.90:8000/blog/${userEmail}/profile`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(profile) {
            console.log(profile)
            const username = $('#user_name');
            const email = $('#email')
            username.html(`${profile.lastName} ${profile.firstName}`)
            if (profile) {
                username.html(`${profile.lastName} ${profile.firstName}`);
                email.html(`${profile.email}`)
            } else {
                console.error('Профиль не найден.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Произошла ошибка:', status, error);
        }
    })
    $.ajax({
        url: 'http://146.185.154.90:8000/blog/john.doe@gmail.com/subscribe',
        method: 'GET',
        data: [],
        success: function(subscribe) {
            console.log('Check')
            console.log(subscribe)
            console.log('Check')

        }
    })

    $('#saveProfileButton').on('click', function() {
        const newFirstName = $('#first_name').val();
        const newLastName = $('#last_name').val();

        if (newFirstName.trim() === '' || newLastName.trim() === '') {
            alert('Пожалуйста, заполните оба поля!');
            return;
        }

        const newData = {
            firstName: newFirstName,
            lastName: newLastName
        };

        $.ajax({
            url: apiUrl,
            method: 'POST',
            data: newData,
            success: function(response) {
                console.log(`Данные успешно обработаны: ${response}`)
                $('#editProdileModal').hide()
                location.reload()
            },
            error: function(xhr, status, erorr) {
                console.error('Произошла ошибка:', status, error);
            }
        })
    });

    $('#followUserButton').on('click', function() {
        $('#followUserModal').modal('show');
    });

    $('#followUserConfirm').on('click', function() {
        const followEmail = $('#followEmail').val();

        // addUserByEmail(followEmail);

        $('#followUserModal').modal('hide');
    });

    $('#editProfileButton').on('click', function() {
        $('#editProfileModal').modal('show');
    });

    // function addUserByEmail(email) {
    //     $.ajax({
    //         url: `http://146.185.154.90:8000/blog/john.doe@gmail.com/subscribe`,
    //         method: 'POST',
    //         success: function(response) {
    //             console.log('Пользователь успешно добавлен:', response);
    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Произошла ошибка:', status, error);
    //         }
    //     });
    // }

})